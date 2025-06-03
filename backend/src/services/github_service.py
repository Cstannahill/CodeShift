# backend/src/services/github_service.py
import httpx
from typing import Dict, Any, Optional, List
from urllib.parse import urlencode
from ..core.config import settings


class GitHubService:
    """Service for GitHub OAuth and API interactions"""

    def __init__(self):
        self.client = httpx.AsyncClient()
        self.oauth_base_url = "https://github.com/login/oauth"
        self.api_base_url = "https://api.github.com"

    def get_oauth_url(self, state: str) -> str:
        """Generate GitHub OAuth URL"""
        params = {
            "client_id": settings.GITHUB_CLIENT_ID,
            "redirect_uri": settings.GITHUB_REDIRECT_URI,
            "scope": "read:user user:email repo",
            "state": state,
        }
        return f"{self.oauth_base_url}/authorize?{urlencode(params)}"

    async def exchange_code_for_token(self, code: str) -> Dict[str, Any]:
        """Exchange authorization code for access token"""
        data = {
            "client_id": settings.GITHUB_CLIENT_ID,
            "client_secret": settings.GITHUB_CLIENT_SECRET,
            "code": code,
            "redirect_uri": settings.GITHUB_REDIRECT_URI,
        }

        headers = {"Accept": "application/json"}

        response = await self.client.post(
            f"{self.oauth_base_url}/access_token", data=data, headers=headers
        )

        if response.status_code != 200:
            raise Exception(f"Failed to exchange code: {response.text}")

        return response.json()

    async def get_user_info(self, access_token: str) -> Dict[str, Any]:
        """Get user information from GitHub"""
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github.v3+json",
        }

        response = await self.client.get(f"{self.api_base_url}/user", headers=headers)

        if response.status_code != 200:
            raise Exception(f"Failed to get user info: {response.text}")

        return response.json()

    async def get_user_emails(self, access_token: str) -> List[Dict[str, Any]]:
        """Get user emails from GitHub"""
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github.v3+json",
        }

        response = await self.client.get(
            f"{self.api_base_url}/user/emails", headers=headers
        )

        if response.status_code != 200:
            raise Exception(f"Failed to get user emails: {response.text}")

        return response.json()

    async def get_user_repositories(
        self,
        access_token: str,
        per_page: int = 30,
        page: int = 1,
        sort: str = "updated",
    ) -> List[Dict[str, Any]]:
        """Get user repositories from GitHub"""
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github.v3+json",
        }

        params = {"per_page": per_page, "page": page, "sort": sort, "direction": "desc"}

        response = await self.client.get(
            f"{self.api_base_url}/user/repos", headers=headers, params=params
        )

        if response.status_code != 200:
            raise Exception(f"Failed to get repositories: {response.text}")

        return response.json()

    async def get_repository_info(
        self, access_token: str, owner: str, repo: str
    ) -> Dict[str, Any]:
        """Get specific repository information"""
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github.v3+json",
        }

        response = await self.client.get(
            f"{self.api_base_url}/repos/{owner}/{repo}", headers=headers
        )

        if response.status_code != 200:
            raise Exception(f"Failed to get repository info: {response.text}")

        return response.json()

    async def get_repository_languages(
        self, access_token: str, owner: str, repo: str
    ) -> Dict[str, int]:
        """Get repository languages"""
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github.v3+json",
        }

        response = await self.client.get(
            f"{self.api_base_url}/repos/{owner}/{repo}/languages", headers=headers
        )

        if response.status_code != 200:
            raise Exception(f"Failed to get repository languages: {response.text}")

        return response.json()

    async def close(self):
        """Close HTTP client"""
        await self.client.aclose()


# Create singleton instance
github_service = GitHubService()
