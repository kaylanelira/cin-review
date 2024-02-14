from fastapi import APIRouter, HTTPException
from starlette.responses import JSONResponse
from src.db import database as db
from bson import ObjectId
from typing import List
from src.service.review_service import ReviewService

from src.schemas.review import (
  ReviewModel,
)

router = APIRouter()

@router.put("/review", response_model=ReviewModel)
async def add_review(review: ReviewModel):
  return ReviewService.add_review(review)