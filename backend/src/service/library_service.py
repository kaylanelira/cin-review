from pymongo.errors import DuplicateKeyError
from fastapi import HTTPException, status
from db import database_library as db
from schemas.library import (
    FolderModel,
    FolderList
)

db_instance = db.Database()

class LibraryService:
  @staticmethod
  def get_all() -> list[dict]:
    folders = db_instance.get_all("folders")
    return folders
  
  @staticmethod
  def get_by_userID(user_id: str) -> list[dict]:
    library = db_instance.get_by_userID("folders", user_id)
      
    if(library is None):
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario nao possui pastas na biblioteca")
    
    return library

  @staticmethod
  def get_by_name_and_userID(folder_name: str, user_id: str) -> dict | None:

    folder = db_instance.get_by_name_and_user("folders", folder_name, user_id)

    return folder
  
  @staticmethod
  def add_folder(folder: FolderModel) -> dict:
    try:
      if "name" not in folder.model_dump() or folder.name is None or folder.name == "":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome eh um campo obrigatório.")
      elif LibraryService.get_by_name_and_userID(folder.name, folder.user_id) != None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail = "Nome de pasta ja existe")

      added_folder = db_instance.add("folders", folder.model_dump())
      return added_folder

    except DuplicateKeyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro interno do servidor")

  @staticmethod
  def edit_folder(original_name: str, updated_folder: FolderModel) -> FolderModel:
    try:
      if LibraryService.get_by_name_and_userID(original_name, updated_folder.user_id) == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pasta nao existe.")
      elif "name" not in updated_folder.model_dump() or updated_folder.name is None or updated_folder.name == "":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome eh um campo obrigatório.")
      elif original_name!=updated_folder.name and LibraryService.get_by_name_and_userID(updated_folder.name, updated_folder.user_id) != None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Nome de pasta ja existe")
      elif len(updated_folder.classes_id) != len(set(updated_folder.classes_id)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail= "Insercao de cadeira repetida na pasta")

      updated_folder = db_instance.edit("folders", original_name, updated_folder.model_dump())

      return updated_folder
    
    except DuplicateKeyError:
      raise HTTPException(status_code=500, detail="Erro interno do servidor")
  
  @staticmethod
  def delete_all():
    db_instance.delete_all("folders")

  @staticmethod
  def delete_user_library(user_id: str):
    db_instance.delete_user_library("folders", user_id)

  @staticmethod
  def delete_folder(folder: FolderModel):
    is_deleted = db_instance.delete_by_name_and_user("folders", folder.model_dump())

    if is_deleted is False:
      raise HTTPException(status_code=404, detail="folder not found")
    
    return folder.name