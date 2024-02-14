from src.schemas.review import ReviewModel
from src.db import database as db
from typing import List
from unittest.mock import patch

db_instance = db.Database()

class ReviewService:
    @staticmethod
    def add_review(review_data: ReviewModel):

      print("======== Creating review ========")

      review = {
        "user_name": review_data.user_name,
        "rating": review_data.rating,
        "comment": review_data.comment
      }

      print("======== Done creating review ========")
      
      return review