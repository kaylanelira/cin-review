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

@router.put("/add",
            tags=['Review'],
            summary='Add a review', 
            response_model=ReviewModel)
async def add_review(new_review: ReviewModel):

  existing_reviews = ReviewService.get_reviews_by_name_and_discipline(new_review.discipline, new_review.username)

  if(len(existing_reviews) > 0):
    return JSONResponse(status_code=409, content={"message": "User has already reviewed this discipline"})

  return ReviewService.add_review(new_review)

@router.get("/get_all",
            tags=['Review'],
            summary='Get all reviews', 
            response_model=List[ReviewModel])
async def get_all_reviews():
  return ReviewService.get_all_reviews()

@router.get("/get_by_discipline_and_user",
            tags=['Review'],
            summary='Get reviews by discipline and user', 
            response_model=List[ReviewModel])
async def get_reviews_by_discipline_and_user(discipline: str, username: str):
  return ReviewService.get_reviews_by_name_and_discipline(discipline, username)