# backend/src/api/auth/router.py
from fastapi import APIRouter, HTTPException, Query, Response, status
from fastapi.responses import RedirectResponse
from typing import Optional
import secrets
import json
from datetime import datetime

from ...database.repositories import user_repo, skill_profile_repo
from ...services.github_service import github_service
from ...core.auth import create_access_token
from ...core.config import settings
from .schemas import GitHubOAuthRequest, GitHubCallbackRequest, AuthResponse, UserInfo

router = APIRouter()

# In-memory state store (use Redis in production)
oauth_states = {}


@router.post("/github", response_model=dict)
async def initiate_github_oauth(request: GitHubOAuthRequest):
    """Initiate GitHub OAuth flow"""
    # Generate secure random state
    state = secrets.token_urlsafe(32)

    # Store state (in production, use Redis with expiration)
    oauth_states[state] = {
        "redirect_uri": request.redirect_uri
        or f"{settings.FRONTEND_URL}/auth/callback",
        "created_at": datetime.utcnow().isoformat(),
    }

    # Get OAuth URL
    auth_url = github_service.get_oauth_url(state)

    return {"auth_url": auth_url}


@router.post("/github/callback", response_model=AuthResponse)
async def handle_github_callback(request: GitHubCallbackRequest):
    """Handle GitHub OAuth callback"""
    # Verify state
    if request.state not in oauth_states:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid state parameter"
        )

    # Remove state from store
    oauth_states.pop(request.state)

    try:
        # Exchange code for token
        token_data = await github_service.exchange_code_for_token(request.code)
        access_token = token_data.get("access_token")

        if not access_token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to obtain access token",
            )

        # Get user info
        github_user = await github_service.get_user_info(access_token)

        # Get primary email
        emails = await github_service.get_user_emails(access_token)
        primary_email = next(
            (email["email"] for email in emails if email["primary"]),
            github_user.get("email"),
        )

        # Check if user exists
        existing_user = await user_repo.find_by_github_id(str(github_user["id"]))

        if existing_user:
            # Update existing user
            user_data = {
                "username": github_user["login"],
                "email": primary_email,
                "avatar_url": github_user["avatar_url"],
                "github_access_token": access_token,
                "last_login": datetime.utcnow(),
            }
            await user_repo.update_by_id(str(existing_user["_id"]), user_data)
            user = existing_user
            user.update(user_data)
        else:
            # Create new user
            user_data = {
                "github_id": str(github_user["id"]),
                "username": github_user["login"],
                "email": primary_email,
                "avatar_url": github_user["avatar_url"],
                "github_access_token": access_token,
                "plan": "free",
                "last_login": datetime.utcnow(),
            }
            user = await user_repo.create(user_data)

            # Create skill profile for new user
            skill_profile = await skill_profile_repo.create(
                {
                    "user_id": user["_id"],
                    "skills": [],
                    "strengths": [],
                    "learning_velocity": {},
                }
            )

            # Update user with skill profile ID
            await user_repo.update_by_id(
                str(user["_id"]), {"skill_profile_id": skill_profile["_id"]}
            )

        # Create JWT token
        jwt_token = create_access_token(
            data={
                "sub": str(user["_id"]),
                "username": user["username"],
                "email": user["email"],
            }
        )

        return AuthResponse(
            access_token=jwt_token,
            user=UserInfo(
                id=str(user["_id"]),
                username=user["username"],
                email=user["email"],
                avatar_url=user.get("avatar_url"),
                plan=user.get("plan", "free"),
            ),
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Authentication failed: {str(e)}",
        )


@router.get("/me", response_model=UserInfo)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    user = await user_repo.find_by_id(current_user["id"])

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    # Get additional stats
    repo_count = await repository_repo.count({"user_id": user["_id"]})

    return UserInfo(
        id=str(user["_id"]),
        username=user["username"],
        email=user["email"],
        avatar_url=user.get("avatar_url"),
        plan=user.get("plan", "free"),
        created_at=user["created_at"],
        skill_profile_id=(
            str(user["skill_profile_id"]) if user.get("skill_profile_id") else None
        ),
        repositories_count=repo_count,
    )


@router.post("/logout")
async def logout(response: Response):
    """Logout user (client-side token removal)"""
    # In a production app, you might want to blacklist the token
    # For now, we'll just return a success response
    return {"message": "Logged out successfully"}
