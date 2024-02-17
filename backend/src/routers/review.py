from fastapi import APIRouter, HTTPException
from starlette.responses import JSONResponse
from db import database as db
from bson import ObjectId
from typing import List
from service.review_service import ReviewService

from schemas.review import (
  ReviewModel,
)

router = APIRouter()

@router.put("/add",
            tags=['Review'],
            summary='Add a review', 
            response_model=ReviewModel)
async def add_review(review: ReviewModel):
  return ReviewService.add_review(review)

@router.get("/get_all",
            tags=['Review'],
            summary='Get all reviews', 
            response_model=List[ReviewModel])
async def get_all_reviews():
  return ReviewService.get_all_reviews()