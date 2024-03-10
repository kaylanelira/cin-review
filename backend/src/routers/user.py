import uuid
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from starlette.responses import JSONResponse
from service.user_service import UserService
from schemas.user import (
    UserCreateList,
    UserCreateModel,
    UserModel,
    UserList
)

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get(
  "/get_user/{user_username}",
  tags=['User'],
  response_model=UserModel,
  response_class=JSONResponse,
  summary="Get a specific user",
)
def get_user(user_username: str):
  user = UserService.get_user_by_username(user_username)
  return user
  
@router.post(
  "/create_user",
  tags=['User'],
  status_code=201,
  response_model=UserCreateModel,
  response_class=JSONResponse,
  summary="Create a user",
)
def create_user(user: UserCreateModel):
  new_user = UserService.add_user(user)
  return new_user

@router.post(
  "/create_users",
  tags=['User'],
  status_code=201,
  response_model=list[UserCreateModel],
  response_class=JSONResponse,
  summary="Create some users",
)
def create_user_list(users: list[UserCreateModel]):
  new_users = []
  for user_data in users:
    if isinstance(user_data, tuple):
      user_dict = dict(zip(UserCreateModel.__annotations__, user_data))
      user = UserCreateModel(**user_dict)
    else:
      user = user_data
    
    new_users.append(UserService.add_user(user))
  return new_users

@router.put(
  "/update_user/{username}",
  tags=['User'],
  response_model=UserCreateModel,
  response_class=JSONResponse,
  summary="Edit a user",
)
def update_user(username: str, updated_user: UserCreateModel):
  updated_user = UserService.edit_user(username, updated_user)
  return updated_user
  
@router.delete(
  "/delete_user/{username}",
  tags=['User'],
  response_class=JSONResponse,
  summary="Delete a user",
)
def delete_user(username: str, password: str):
  deleted_user = UserService.delete_user(username, password)
  return deleted_user

@router.get(
  "/profile", 
  tags=['User'])
async def read_users_profile(current_user: UserModel = Depends(oauth2_scheme)):
    return current_user

@router.post("/login",
  tags=['User'])
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
  return UserService.login(form_data.username)

# ROTAS CRIADAS PARA FACILITAR TESTES NO FASTAPI DOCS
@router.delete(
  "/delete_all",
  tags=['User'],
  response_class=JSONResponse,
  summary="Delete all users",
)
def delete_all():
  UserService.delete_all_users()

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