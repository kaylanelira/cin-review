from fastapi import APIRouter, HTTPException
from schemas.review import ReviewModel
from bson import ObjectId
from operator import itemgetter
from starlette.responses import JSONResponse
from db import database as db
from typing import List
from service.review_service import ReviewService

router = APIRouter()

@router.get("/oldest/{discipline}/{pgnumber}",
            tags = ["ShowReview"], 
            summary = "Search for the oldest reviews of a discipline",
            response_model=List[ReviewModel])
def get_oldest_reviews_by_discipline(discipline : str, pgnumber: int):
    reviews = ReviewService.get_reviews_by_discipline(discipline)
    length = len(reviews)
    if(length == 0):
        return JSONResponse(status_code=404, content={"message": "We couldn't find any reviews for this discipline"})
    
    startingindex = (pgnumber-1)*10
    if((startingindex+1) > length):
        return JSONResponse(status_code=404, content={"message": "We couldn't find any more reviews for this discipline"})

    oldestreviews = sorted(reviews, key = itemgetter("time"))
    return oldestreviews[startingindex : (startingindex+10)]


@router.get("/recents/{discipline}/{pgnumber}",
            tags = ["ShowReview"], 
            summary = "Search for the newest reviews of a discipline",
            response_model=List[ReviewModel])
def get_newest_reviews_by_discipline(discipline : str, pgnumber: int):
    reviews = ReviewService.get_reviews_by_discipline(discipline)
    length = len(reviews)
    if(length == 0):
        return JSONResponse(status_code=404, content={"message": "We couldn't find any reviews for this discipline"})
    
    startingindex = (pgnumber-1)*10
    if((startingindex+1) > length):
        return JSONResponse(status_code=404, content={"message": "We couldn't find any more reviews for this discipline"})
    
    oldestreviews = sorted(reviews, key = itemgetter("time"), reverse = True)
    return oldestreviews[startingindex : (startingindex+10)]


@router.get("/bestgrades/{discipline}/{pgnumber}",
            tags = ["ShowReview"], 
            summary = "Search for the reviews which give the highest ratings to a discipline",
            response_model=List[ReviewModel])
def get_highest_grades_reviews_by_discipline(discipline : str, pgnumber: int):
    reviews = ReviewService.get_reviews_by_discipline(discipline)
    length = len(reviews)
    if(length == 0):
        return JSONResponse(status_code=404, content={"message": "We couldn't find any reviews for this discipline"})
    
    startingindex = (pgnumber-1)*10
    if((startingindex+1) > length):
        return JSONResponse(status_code=404, content={"message": "We couldn't find any more reviews for this discipline"})
    
    highestgradesreviews = sorted(reviews, key = itemgetter("rating"), reverse = True)
    return highestgradesreviews[startingindex : (startingindex+10)]


@router.get("/worstgrades/{discipline}/{pgnumber}",
            tags = ["ShowReview"], 
            summary = "Search for the reviews which give the lowest ratings to a discipline",
            response_model=List[ReviewModel])
def get_lowest_grades_reviews_by_discipline(discipline : str, pgnumber: int):
    reviews = ReviewService.get_reviews_by_discipline(discipline)
    length = len(reviews)
    if(length == 0):
        return JSONResponse(status_code=404, content={"message": "We couldn't find any reviews for this discipline"})
    
    startingindex = (pgnumber-1)*10
    if((startingindex+1) > length):
        return JSONResponse(status_code=404, content={"message": "We couldn't find any more reviews for this discipline"})
    
    lowestgradesreviews = sorted(reviews, key = itemgetter("rating"))
    return lowestgradesreviews[startingindex : (startingindex+10)]

@router.get("/mean/{discipline}",
            tags = ["ShowReview"], 
            summary = "Search for the average grade of a discipline's reviews",
            response_model= float)
async def average(discipline : str):
    reviews = ReviewService.get_reviews_by_discipline(discipline)
    qtd = len(reviews)
    if(qtd == 0):
        return JSONResponse(status_code=404, content={"message": "We couldn't find any reviews for this discipline"})
    
    sum = 0
    for review in reviews:
        sum += review["rating"]
    average = sum/qtd
    return round(average, 2)
