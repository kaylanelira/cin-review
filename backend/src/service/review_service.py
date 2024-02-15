from src.schemas.review import ReviewModel
from src.db import database as db
from typing import List
from unittest.mock import patch

db_instance = db.Database()

class ReviewService:
    @staticmethod
    def add_review(review_data: ReviewModel):

      added_review = db_instance.add("reviews", review_data)
      
      return added_review
    
    @staticmethod
    def get_all_reviews():
      reviews = db_instance.get_all_items("reviews")
      for review in reviews:
        review['_id'] = str(review['_id'])
        
      return reviews