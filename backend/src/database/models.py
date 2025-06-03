# backend/src/database/models.py
from datetime import datetime
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class MongoModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "_id": "507f1f77bcf86cd799439011",
                "created_at": "2023-12-01T00:00:00",
                "updated_at": "2023-12-01T00:00:00",
            }
        }


# User Model
class User(MongoModel):
    github_id: str = Field(..., unique=True)
    username: str
    email: EmailStr
    avatar_url: Optional[str] = None

    # Account details
    plan: str = Field(default="free", regex="^(free|pro|enterprise)$")
    github_access_token: Optional[str] = None

    # Related IDs
    skill_profile_id: Optional[PyObjectId] = None
    repository_ids: List[PyObjectId] = Field(default_factory=list)
    learning_path_ids: List[PyObjectId] = Field(default_factory=list)

    # Metadata
    last_login: Optional[datetime] = None
    preferences: Dict[str, Any] = Field(default_factory=dict)


# Repository Model
class Repository(MongoModel):
    user_id: PyObjectId
    github_url: str
    name: str
    full_name: str
    branch: str = "main"

    # Analysis status
    status: str = Field(
        default="pending", regex="^(pending|analyzing|completed|failed)$"
    )
    analyzed_at: Optional[datetime] = None

    # Technologies
    technologies: Dict[str, Any] = Field(
        default_factory=lambda: {"languages": [], "frameworks": [], "packages": []}
    )

    # Metrics
    metrics: Dict[str, Any] = Field(default_factory=dict)

    # Cache
    last_commit_sha: Optional[str] = None
    cached_files: Optional[Dict[str, Any]] = None


# Skill Profile Model
class Skill(BaseModel):
    technology: str
    category: str  # 'language' | 'framework' | 'library' | 'tool'
    proficiency: float = Field(ge=0, le=10)  # 0-10 scale
    experience: Dict[str, Any] = Field(
        default_factory=lambda: {
            "first_seen": None,
            "last_used": None,
            "project_count": 0,
            "total_lines": 0,
        }
    )
    confidence: float = Field(ge=0, le=1)  # 0-1 scale


class SkillProfile(MongoModel):
    user_id: PyObjectId
    skills: List[Skill] = Field(default_factory=list)
    strengths: List[str] = Field(default_factory=list)
    learning_velocity: Dict[str, List[str]] = Field(default_factory=dict)

    # Metrics
    metrics: Dict[str, Any] = Field(
        default_factory=lambda: {
            "total_repositories": 0,
            "total_technologies": 0,
            "avg_proficiency": 0.0,
            "strongest_category": None,
        }
    )


# Translation Model
class Translation(MongoModel):
    user_id: PyObjectId

    # Source
    source: Dict[str, Any] = Field(
        ...,
        example={
            "framework": "nextjs",
            "language": "javascript",
            "code": "// source code here",
            "packages": ["next", "react"],
        },
    )

    # Target
    target: Dict[str, Any] = Field(
        ...,
        example={
            "framework": "vite-react",
            "language": "typescript",
            "code": "// translated code here",
            "packages": ["vite", "react", "react-router-dom"],
        },
    )

    # Metadata
    metadata: Dict[str, Any] = Field(
        default_factory=lambda: {
            "confidence": 0.0,
            "warnings": [],
            "suggestions": [],
            "patterns_used": [],
            "manual_changes_required": [],
        }
    )

    # Analytics
    feedback: Optional[Dict[str, Any]] = None
    execution_time: Optional[float] = None


# Learning Path Model
class Lesson(BaseModel):
    id: str
    order: int
    title: str
    description: str
    objectives: List[str]
    content: str  # Markdown content
    examples: List[Dict[str, Any]] = Field(default_factory=list)
    exercises: List[Dict[str, Any]] = Field(default_factory=list)
    estimated_time: int  # minutes
    completed: bool = False
    completed_at: Optional[datetime] = None


class LearningPath(MongoModel):
    user_id: PyObjectId
    title: str

    # Learning configuration
    from_technology: Dict[str, Any] = Field(
        ..., example={"technology": "nextjs", "current_proficiency": 7.5}
    )
    to_technology: Dict[str, Any] = Field(
        ..., example={"technology": "vite-react", "target_proficiency": 8.0}
    )

    # Curriculum
    lessons: List[Lesson] = Field(default_factory=list)
    estimated_hours: float
    difficulty: str  # 'beginner' | 'intermediate' | 'advanced'

    # Progress
    progress: float = Field(default=0.0, ge=0, le=100)
    status: str = Field(default="active", regex="^(active|completed|paused|abandoned)$")
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    # Metadata
    learning_style: Optional[str] = None
    time_commitment: Optional[str] = None
    deadline: Optional[datetime] = None


# Analysis Job Model
class AnalysisJob(MongoModel):
    user_id: PyObjectId
    repository_id: Optional[PyObjectId] = None

    # Job info
    type: str  # 'repository' | 'translation' | 'skill_assessment'
    status: str = Field(
        default="queued", regex="^(queued|processing|completed|failed)$"
    )
    priority: int = Field(default=5, ge=1, le=10)

    # Progress
    progress: Dict[str, Any] = Field(
        default_factory=lambda: {
            "percentage": 0,
            "current_step": "",
            "current_file": "",
            "steps": [],
            "metrics": {},
        }
    )

    # Results
    result: Optional[Dict[str, Any]] = None

    # Execution
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    duration: Optional[float] = None  # milliseconds

    # Worker info
    worker_id: Optional[str] = None
    worker_host: Optional[str] = None

    # Error handling
    error: Optional[Dict[str, Any]] = None
    retries: int = 0
    max_retries: int = 3
