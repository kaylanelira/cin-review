from fastapi import APIRouter, HTTPException
from starlette.responses import JSONResponse
from src.db import database as db
from bson import ObjectId
from typing import List
from src.service.user_service import UserService
from src.schemas.user import (
    UserGet,
    UserModel,
    UserCreate,
    UserList,
    # SongDelete,
)

router = APIRouter()
db_instance = db.Database()
collection = db_instance.get_db()['users']

@router.get(
  "/users/{user_id}",
  response_model=dict,
  response_class=JSONResponse,
  summary="Get a specific user",
)
def get_user(user_id: str):
  user = UserService.get_user(user_id)
  
  return user

@router.get(
  "/users",
  response_model=List[dict],
  response_class=JSONResponse,
  summary="Get all users",
)
def get_all_users():
  users = UserService.get_users()
  
  return users
  
@router.post(
  "/users",
  response_model=UserModel,
  response_class=JSONResponse,
  summary="create a user",
)
def add_user(user: UserCreate):
  user_add_response = UserService.add_user(user)

  return user_add_response