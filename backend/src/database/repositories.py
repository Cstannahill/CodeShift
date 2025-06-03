# backend/src/database/repositories.py
from typing import List, Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorCollection
from .connection import db
from .models import (
    User,
    Repository,
    SkillProfile,
    Translation,
    LearningPath,
    AnalysisJob,
)


class BaseRepository:
    """Base repository with common CRUD operations"""

    model_class = None
    collection_name = None

    @property
    def collection(self) -> AsyncIOMotorCollection:
        return db.db[self.collection_name]

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new document"""
        if "created_at" not in data:
            data["created_at"] = datetime.utcnow()
        if "updated_at" not in data:
            data["updated_at"] = datetime.utcnow()

        result = await self.collection.insert_one(data)
        data["_id"] = result.inserted_id
        return data

    async def find_by_id(self, id: str) -> Optional[Dict[str, Any]]:
        """Find document by ID"""
        return await self.collection.find_one({"_id": ObjectId(id)})

    async def find_one(self, filter: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Find one document matching filter"""
        return await self.collection.find_one(filter)

    async def find_many(
        self,
        filter: Dict[str, Any] = {},
        skip: int = 0,
        limit: int = 100,
        sort: Optional[List[tuple]] = None,
    ) -> List[Dict[str, Any]]:
        """Find multiple documents"""
        cursor = self.collection.find(filter).skip(skip).limit(limit)
        if sort:
            cursor = cursor.sort(sort)
        return await cursor.to_list(length=limit)

    async def update_by_id(self, id: str, data: Dict[str, Any]) -> bool:
        """Update document by ID"""
        data["updated_at"] = datetime.utcnow()
        result = await self.collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        return result.modified_count > 0

    async def delete_by_id(self, id: str) -> bool:
        """Delete document by ID"""
        result = await self.collection.delete_one({"_id": ObjectId(id)})
        return result.deleted_count > 0

    async def count(self, filter: Dict[str, Any] = {}) -> int:
        """Count documents matching filter"""
        return await self.collection.count_documents(filter)


class UserRepository(BaseRepository):
    model_class = User
    collection_name = "users"

    async def find_by_github_id(self, github_id: str) -> Optional[Dict[str, Any]]:
        """Find user by GitHub ID"""
        return await self.find_one({"github_id": github_id})

    async def find_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        """Find user by username"""
        return await self.find_one({"username": username})

    async def update_last_login(self, user_id: str) -> bool:
        """Update user's last login time"""
        return await self.update_by_id(user_id, {"last_login": datetime.utcnow()})


class RepositoryRepository(BaseRepository):
    model_class = Repository
    collection_name = "repositories"

    async def find_by_user(
        self, user_id: str, status: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Find repositories by user ID"""
        filter = {"user_id": ObjectId(user_id)}
        if status:
            filter["status"] = status
        return await self.find_many(filter, sort=[("created_at", -1)])

    async def find_by_github_url(self, github_url: str) -> Optional[Dict[str, Any]]:
        """Find repository by GitHub URL"""
        return await self.find_one({"github_url": github_url})


class SkillProfileRepository(BaseRepository):
    model_class = SkillProfile
    collection_name = "skillProfiles"

    async def find_by_user(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Find skill profile by user ID"""
        return await self.find_one({"user_id": ObjectId(user_id)})

    async def update_skills(
        self, profile_id: str, skills: List[Dict[str, Any]]
    ) -> bool:
        """Update skills in profile"""
        return await self.update_by_id(profile_id, {"skills": skills})


class TranslationRepository(BaseRepository):
    model_class = Translation
    collection_name = "translations"

    async def find_by_user(
        self,
        user_id: str,
        source_framework: Optional[str] = None,
        target_framework: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        """Find translations by user with optional framework filters"""
        filter = {"user_id": ObjectId(user_id)}
        if source_framework:
            filter["source.framework"] = source_framework
        if target_framework:
            filter["target.framework"] = target_framework
        return await self.find_many(filter, sort=[("created_at", -1)])


class LearningPathRepository(BaseRepository):
    model_class = LearningPath
    collection_name = "learningPaths"

    async def find_active_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        """Find active learning paths for user"""
        return await self.find_many(
            {"user_id": ObjectId(user_id), "status": "active"},
            sort=[("created_at", -1)],
        )

    async def update_progress(self, path_id: str, progress: float) -> bool:
        """Update learning path progress"""
        return await self.update_by_id(path_id, {"progress": progress})


class AnalysisJobRepository(BaseRepository):
    model_class = AnalysisJob
    collection_name = "analysisJobs"

    async def find_pending_jobs(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Find pending jobs ordered by priority"""
        return await self.find_many(
            {"status": "queued"},
            limit=limit,
            sort=[("priority", -1), ("created_at", 1)],
        )

    async def update_progress(self, job_id: str, progress: Dict[str, Any]) -> bool:
        """Update job progress"""
        return await self.update_by_id(job_id, {"progress": progress})


# Initialize repositories
user_repo = UserRepository()
repository_repo = RepositoryRepository()
skill_profile_repo = SkillProfileRepository()
translation_repo = TranslationRepository()
learning_path_repo = LearningPathRepository()
analysis_job_repo = AnalysisJobRepository()
