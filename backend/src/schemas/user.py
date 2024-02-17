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
  name: str
  surname: Optional[str] = None
  username: str
  email: EmailStr
  password: str
  same_password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None
  
  @validator("name", "username", "email", "password", "same_password")
  def check_required_fields(cls, value):
    if not value:
      field_name = cls.__annotations__.get(value)
      logger.error(f"{field_name} é um campo obrigatório")
      raise ValueError(f"{field_name} é um campo obrigatório")
    return value

  @validator("password", pre=True, always=True)
  def check_passwords_match(cls, value, values):
    if "same_password" in values and value != values["same_password"]:
      logger.error("As senhas não coincidem")
      raise ValueError("As senhas não coincidem")
    return value

class UserList(BaseModel):
  users: list[UserModel]