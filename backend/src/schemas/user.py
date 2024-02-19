from typing import Optional
from pydantic import BaseModel, EmailStr

class UserModel(BaseModel):
  id: str
  name: str
  surname: Optional[str] = None
  username: str
  email: str
  password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None
  profile_picture: Optional[str] = None

class UserList(BaseModel):
  users: list[UserModel]