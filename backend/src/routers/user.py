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
    UserCreateModel,
    UserList
)

router = APIRouter()

@router.get(
  "/user/get_user/{user_id}",
  response_model=UserModel,
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
  "/user/create_user",
  response_model=UserModel,
  response_class=JSONResponse,
  summary="create a user",
)
def create_user(user: UserCreate):
  new_user = UserService.add_user(user)

  return new_user

@router.put(
  "/user/update_user/{user_id}",
  response_model=UserModel,
  response_class=JSONResponse,
  summary="Edit a user",
)
def update_user(user_id: str, updated_user: UserCreateModel):
  updated_user = UserService.edit_user(user_id, updated_user)
  if not updated_user:
      raise HTTPException(status_code=404, detail="User not found")
  return updated_user
  
@router.delete(
  "/user/delete_user/{user_id}",
  response_class=JSONResponse,
  summary="Delete a user",
)
def delete_user(user_id: str):
  deleted_user = UserService.delete_user(user_id)
  if not deleted_user:
      raise HTTPException(status_code=404, detail="User not found")
  return {"message": "User deleted successfully"}