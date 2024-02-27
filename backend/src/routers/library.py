from fastapi import APIRouter, HTTPException
from starlette.responses import JSONResponse
from service.library_service import LibraryService
from schemas.library import (
    FolderModel,
    FolderList
)

router = APIRouter()

"""
@router.get : exibir todas as pastas de um usuário
@router.get : exibir uma pasta de um usuário
@router.post : criar pasta na biblioteca
@router.put : editar informações de uma pasta
@router.delete : remover pasta

"""
@router.get(
  "/get_all_folders",
  tags=['Library'],
  response_model=FolderList,
  response_class=JSONResponse,
  summary="Get all folders from the database",
)
def get_all_folders():
  folders = LibraryService.get_all()
  return {"db": folders}

@router.get(
  "/get_user_library/{user_id}",
  tags=['Library'],
  response_model=FolderList,
  status_code=200,
  response_class=JSONResponse,
  summary="Get all folders from a user's library",
)
def get_user_library(user_id: str):
  folders = LibraryService.get_by_userID(user_id)
  return {"library": folders}

@router.get(
  "/get_folder/{folder_name}",
  tags=['Library'],
  response_model=FolderModel,
  status_code=200,
  response_class=JSONResponse,
  summary="Get a specific folder from user",
)
def get_folder(folder_name: str, user_id: str):
  folder_name = folder_name.replace('_',' ')
  folder = LibraryService.get_by_name_and_userID(folder_name, user_id)
  return {"folder": folder}

@router.post(
  "/create_folder",
  tags=['Library'],
  status_code=200,
  response_class=JSONResponse,
  summary="create a folder",
)
def create_folder(folder: FolderModel):
  new_folder = LibraryService.add_folder(folder)
  return {"detail": f'{new_folder["name"]}'}

@router.put(
  "/{original_name}/update_folder",
  tags=['Library'],
  response_class=JSONResponse,
  status_code=200,
  summary="Edit a folder",
)
def update_folder(original_name: str, updated_folder: FolderModel):
  original_name = original_name.replace('_',' ')
  updated_folder = LibraryService.edit_folder(original_name, updated_folder)
  return {"detail": f'{updated_folder["name"]}'}

@router.delete(
  "/{folder_name}/delete_folder",
  tags=['Library'],
  response_class=JSONResponse,
  status_code=200,
  summary="Delete a folder",
)
def delete_folder(user_id:str, folder_name:str):
  folder_name = folder_name.replace('_',' ')
  name = LibraryService.delete_folder(FolderModel(user_id=user_id,name=folder_name))
  return {"detail": f'{name}'}

@router.delete(
  "/delete_all",
  tags=['Library'],
  response_class=JSONResponse,
  status_code=200,
  summary="Delete all folders",
)
def delete_all():
  LibraryService.delete_all()