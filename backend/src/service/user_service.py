from src.schemas.user import UserCreateModel
from src.db import database as db
from typing import List
from unittest.mock import patch

db_instance = db.Database()

class UserService:
    @staticmethod
    def get_users():
      users = db_instance.get_all_items("users")
      for user in users:
        user['_id'] = str(user['_id'])
        
      return users

    @staticmethod
    def get_user(user_id: str):
      user = db_instance.find_by_id("users", user_id)
      user['_id'] = str(user['_id'])

      if not user:
          return None

      return user

    @staticmethod
    def add_user(user: UserCreateModel):
      added_user = db_instance.add("users", user)

      print("======== USER SERVICE ========")
      print(added_user)
      print("======== USER SERVICE ========")
      return added_user

    @staticmethod
    def edit_user(id: str, user: UserCreateModel):
      edited_user = db_instance.edit("users", id, user)

      return edited_user

    @staticmethod
    def delete_user(id: str):
      deleted_user = db_instance.delete("users", id)

      return deleted_user