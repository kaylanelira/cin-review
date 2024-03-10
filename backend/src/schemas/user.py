from typing import Optional
from pydantic import BaseModel, EmailStr

# Classe base do user
class UserModel(BaseModel):
  id: str
  name: str
  surname: Optional[str] = None
  username: str
  email: str
  password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None
  
# Classe base do user para operações que requerem duas senhas iguais
class UserCreateModel(BaseModel):
  name: str
  surname: Optional[str] = None
  username: str
  email: str
  password: str
  repeated_password: str
  phone_number: Optional[str] = None
  field_of_interest: Optional[str] = None

# Classe de lista de usuários
class UserList(BaseModel):
  users: list[UserModel]
  
class UserCreateList(BaseModel):
  users: list[UserCreateModel]