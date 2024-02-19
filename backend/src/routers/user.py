import io
from fastapi import APIRouter, File, HTTPException, UploadFile
from starlette.responses import JSONResponse
from schemas.profile_picture import ProfilePicture
from service.user_service import UserService
from schemas.user import (
    UserModel,
    UserList
)

router = APIRouter()

@router.get(
  "/get_user/{user_id}",
  tags=['User'],
  response_model=UserModel,
  response_class=JSONResponse,
  summary="Get a specific user",
)
def get_user(user_id: str):
  user = UserService.get_user(user_id)
  
  return user

@router.get(
  "/get_all",
  tags=['User'],
  response_model=UserList,
  response_class=JSONResponse,
  summary="Get all users",
)
def get_all_users():
  users = UserService.get_users()
  return {"users": users}
  
@router.post(
  "/create_user",
  tags=['User'],
  status_code=201,
  response_model=UserModel,
  response_class=JSONResponse,
  summary="Create a user",
)
def create_user(user: UserModel):  
  new_user = UserService.add_user(user)

  return new_user

@router.post(
  "/upload_profile_picture",
  tags=['User'],
  status_code=201,
  response_class=JSONResponse,
  summary="Upload a profile pricture",
)
async def upload_profile_picture(user_id: str, profile_picture: UploadFile):
  file_id = await UserService.save_profile_picture(user_id, profile_picture)
  return file_id

@router.get(
  "/get_profile_picture/{user_id}",
  tags=['User'],
  status_code=201,
  response_class=JSONResponse,
  summary="Get a profile pricture",
)
def get_profile_picture(user_id: str):  
    try:
        profile_picture = UserService.get_profile_picture(user_id)
        return profile_picture

    except HTTPException as e:
        # Tratando a exceção HTTPException e retornando uma JSONResponse
        return JSONResponse(content={"detail": str(e)}, status_code=e.status_code)
    
@router.put(
  "/update_user/{user_id}",
  tags=['User'],
  response_model=UserModel,
  response_class=JSONResponse,
  summary="Edit a user",
)
def update_user(user_id: str, updated_user: UserModel):
  updated_user = UserService.edit_user(user_id, updated_user)
  
  return updated_user
  
@router.delete(
  "/delete_user/{user_id}",
  tags=['User'],
  response_class=JSONResponse,
  summary="Delete a user",
)
def delete_user(user_id: str, password: str):
  deleted_user = UserService.delete_user(user_id, password)
  return deleted_user

@router.delete(
  "/delete_all",
  tags=['User'],
  response_class=JSONResponse,
  summary="Delete all users",
)
def delete_all():
  UserService.delete_all_users()