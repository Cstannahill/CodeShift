# backend/src/core/config.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class GitHubOAuthRequest(BaseModel):
    redirect_uri: Optional[str] = None


class GitHubCallbackRequest(BaseModel):
    code: str
    state: str


class UserInfo(BaseModel):
    id: str
    username: str
    email: EmailStr
    avatar_url: Optional[str] = None
    plan: str = "free"
    created_at: Optional[datetime] = None
    skill_profile_id: Optional[str] = None
    repositories_count: Optional[int] = 0


class AuthResponse(BaseModel):
    access_token: str
    user: UserInfo
