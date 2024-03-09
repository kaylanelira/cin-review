from schemas.review import ReviewModel
from db import database as db
from typing import List
from unittest.mock import patch
import datetime

db_instance = db.Database()

class ReviewService:
    @staticmethod
    def add_review(review_data: ReviewModel):
    
      review_data.time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      
      print(review_data)

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
      
      review_data.time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

      edited_review = db_instance.edit("reviews", id, review_data)

      return edited_review
    
    @staticmethod
    def delete_all_reviews():
      reviews = db_instance.get_all_items("reviews")

      for review in reviews:
        db_instance.delete("reviews", str(review['_id']))
        
      return  db_instance.get_all_items("reviews")
    
    @staticmethod
    def get_disciplines_by_most_reviews():
      reviews = db_instance.get_all_items("reviews")
      
      discipline_review_count = {}
      for review in reviews:
        discipline = review['discipline']
        discipline_review_count[discipline] = discipline_review_count.get(discipline, 0) + 1
      
      sorted_disciplines = sorted(discipline_review_count.items(), key=lambda x: x[1], reverse=True)
      
      top_disciplines = [discipline for discipline, _ in sorted_disciplines[:10]]
      
      return top_disciplines
    
    @staticmethod
    def get_recent_reviews():
      reviews = db_instance.get_all_items("reviews")
      
      sorted_reviews = sorted(reviews, key=lambda x: x['time'], reverse=True)
      
      return sorted_reviews[:10]
    
    @staticmethod
    def get_reviews_by_discipline(discipline: str):
      reviews = db_instance.get_all_items("reviews")

      reviews = [review for review in reviews if review['discipline'] == discipline]

      return reviews

    @staticmethod
    def delete_all_discipline_reviews(discipline : str):
      reviews = db_instance.get_all_items("reviews")

      for review in reviews:
        if(review["disipline"] == discipline):
          db_instance.delete("reviews", str(review['_id']))
        
      return  db_instance.get_all_items("reviews")