from schemas.review import ReviewModel
from db import database as db
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
    
    @staticmethod
    def get_reviews_by_name_and_discipline(discipline: str, username: str):
      reviews = db_instance.get_all_items("reviews")

      reviews = [review for review in reviews if review['discipline'] == discipline and review['username'] == username]

      return reviews
    
    @staticmethod
    def delete_review(id: str):

      deleted_review_id = db_instance.delete("reviews", id)

      return deleted_review_id

    @staticmethod
    def edit_review(id: str, review_data: ReviewModel):

      edited_review = db_instance.edit("reviews", id, review_data)

      return edited_review
    
    @staticmethod
    def delete_all_reviews():
      reviews = db_instance.get_all_items("reviews")

      for review in reviews:
        db_instance.delete("reviews", str(review['_id']))