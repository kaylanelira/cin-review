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

@router.post("/add",
            tags=['Review'],
            summary='Add a review', 
            response_model=ReviewModel)
async def add_review(new_review: ReviewModel):

  existing_reviews = ReviewService.get_reviews_by_name_and_discipline(new_review.discipline, new_review.username)

  if(len(existing_reviews) > 0):
    return JSONResponse(status_code=409, content={"message": "User has already reviewed this discipline"})

  return ReviewService.add_review(new_review)

@router.put("/edit",
            tags=['Review'],
            summary='Edit a review', 
            response_model=ReviewModel)
async def edit_review(discipline: str, username: str, new_review: ReviewModel):
  
    existing_reviews = ReviewService.get_reviews_by_name_and_discipline(discipline, username)
  
    if(len(existing_reviews) == 0):
      return JSONResponse(status_code=404, content={"message": "No review found"})
  
    id_to_edit = existing_reviews[0]['_id']
  
    return ReviewService.edit_review(id_to_edit, new_review)

@router.delete("/delete",
                tags=['Review'],
                summary='Delete a review', 
                response_model=ReviewModel)
async def delete_review(discipline: str, username: str):

  existing_reviews = ReviewService.get_reviews_by_name_and_discipline(discipline, username)

  if(len(existing_reviews) == 0):
    return JSONResponse(status_code=404, content={"message": "Review not found"})
  
  id_to_delete = existing_reviews[0]['_id']

  removed_id = ReviewService.delete_review(id_to_delete)

  return JSONResponse(status_code=200, content={"message": "Review with id " + str(removed_id['id']) + " deleted"})
