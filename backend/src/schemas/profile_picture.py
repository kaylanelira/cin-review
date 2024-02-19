from fastapi import UploadFile
from pydantic import BaseModel

class ProfilePicture(BaseModel):
    file_id: str