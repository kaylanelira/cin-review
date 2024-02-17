from pydantic import ValidationError
from pymongo import IndexModel
from src.schemas.user import UserModel
from src.db import database as db
from typing import List
from unittest.mock import patch
from pymongo.errors import DuplicateKeyError
from fastapi import HTTPException, status

db_instance = db.Database()

class UserService:
  @staticmethod
  def get_users():
    users = db_instance.get_all_items("users")
    user_models = [UserModel(**user) for user in users]
    return user_models

  @staticmethod
  def get_user(user_id: str):
    user = db_instance.find_by_id("users", user_id)
    user['_id'] = str(user['_id'])

    if not user:
      return None

    return user

  @staticmethod
  def add_user(user: UserModel):
    try:
      if UserService.email_exists(user.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email indisponivel")
      elif UserService.username_exists(user.username):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Nome de usuário indisponivel")
      
      added_user = db_instance.add("users", user.model_dump())
      return added_user
    except DuplicateKeyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro interno do servidor")


  @staticmethod
  def edit_user(id: str, user: UserModel):
    edited_user = db_instance.edit("users", id, user)
    if edited_user is not None:
      return edited_user
    else:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")


  @staticmethod
  def delete_user(id: str, password: str):
    user = UserService.get_user(id)
    if user["password"] == password:
      deleted_user = db_instance.delete("users", id)
    else:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Senha incorreta. A conta não foi deletada.")
    if not deleted_user:
      raise HTTPException(status_code=404, detail="User not found")
    
    return deleted_user
  
  @staticmethod
  def delete_all_users():
    db_instance.delete_all_users()
  
  @staticmethod
  def get_user_by_username(username: str):
    user = db_instance.get_by_username("users", username)
    
    if not user:
      return None
    
    return user
  
  @staticmethod
  def email_exists(email):
    return db_instance.find_one("users", {"email": email}) is not None
  
  @staticmethod
  def username_exists(username):
    return db_instance.find_one("users", {"username": username}) is not None