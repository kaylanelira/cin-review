import json
from pydantic import BaseModel

class FolderModel(BaseModel):
  user_id: str
  name: str
  classes_id: list[int] = []

class FolderList(BaseModel):
  users: list[FolderModel]