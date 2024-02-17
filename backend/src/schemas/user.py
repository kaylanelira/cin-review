from typing import Optional
from fastapi import logger
from pydantic import BaseModel, EmailStr
from pydantic import validator

class UserModel(BaseModel):
  id: str
  name: str
  surname: Optional[str] = None
  username: str
  email: EmailStr
  password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None


class UserGet(BaseModel):
  id: str
  name: str
  surname: Optional[str] = None
  username: str
  email: EmailStr
  password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None

class UserCreateModel(BaseModel):
  id: str
  name: str
  surname: Optional[str] = None
  username: str
  email: EmailStr
  password: str
  same_password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None

class UserList(BaseModel):
  users: list[UserModel]