from typing import Optional
from pydantic import BaseModel

class UserCreate(BaseModel):
  name: str
  surname: str
  username: str
  email: str
  password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None

class UserModel(BaseModel):
  id: str
  name: str
  surname: str
  username: str
  email: str
  password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None


class UserGet(BaseModel):
  id: str
  name: str
  surname: str
  username: str
  email: str
  password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None

class UserCreateModel(BaseModel):
  id: str
  name: str
  surname: str
  username: str
  email: str
  password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None

class UserList(BaseModel):
  users: list[UserModel]