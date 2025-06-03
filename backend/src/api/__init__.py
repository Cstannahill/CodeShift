# backend/src/api/__init__.py
from fastapi import APIRouter
from .auth.router import router as auth_router

# from .repositories.router import router as repositories_router
# from .translation.router import router as translation_router
# from .learning.router import router as learning_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
# api_router.include_router(repositories_router, prefix="/repositories", tags=["Repositories"])
# api_router.include_router(translation_router, prefix="/translation", tags=["Translation"])
# api_router.include_router(learning_router, prefix="/learning", tags=["Learning"])
