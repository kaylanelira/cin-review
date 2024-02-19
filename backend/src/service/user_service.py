from fastapi.responses import StreamingResponse
from schemas.profile_picture import ProfilePicture
from schemas.user import UserModel
from db import database_user as db
from pymongo.errors import DuplicateKeyError
from fastapi import HTTPException, UploadFile, status

db_instance = db.Database()

class UserService:
  @staticmethod
  def get_users():
    users = db_instance.get_all_items("users")
    return users

  @staticmethod
  def get_user(user_id: str):
    user = db_instance.find_by_id("users", user_id)

    if not user:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

    return user

  @staticmethod
  def add_user(user: UserModel):
    try:
      if "name" not in user.model_dump() or user.name is None or user.name == "":
          raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome é um campo obrigatório.")
      elif "username" not in user.model_dump() or user.username is None or user.username == "":
          raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome de usuário é um campo obrigatório.")
      elif "email" not in user.model_dump() or user.email is None or user.email == "":
          raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email é um campo obrigatório.")
      elif "password" not in user.model_dump() or user.password is None or user.password == "":
          raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Senha é um campo obrigatório.")
      elif UserService.email_exists(user.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Email indisponivel")
      elif UserService.username_exists(user.username):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Nome de usuário indisponivel")
      
      added_user = db_instance.add("users", user.model_dump())
      return added_user
    except DuplicateKeyError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro interno do servidor")

  @staticmethod
  def edit_user(id: str, user: UserModel):
    try:
      existing_user = db_instance.get_item_by_id("users", id)

      if not existing_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
      elif "name" not in user.model_dump() or user.name is None or user.name == "":
          raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome é um campo obrigatório.")
      elif "username" not in user.model_dump() or user.username is None or user.username == "":
          raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome de usuário é um campo obrigatório.")
      elif "email" not in user.model_dump() or user.email is None or user.email == "":
          raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email é um campo obrigatório.")
      elif "password" not in user.model_dump() or user.password is None or user.password == "":
          raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Senha é um campo obrigatório.")
      elif user.username != existing_user["username"] and UserService.username_exists(user.username):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Nome de usuário indisponivel")
      elif user.email != existing_user["email"] and UserService.email_exists(user.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email indisponivel")

      # Atualize os campos necessários
      existing_user.update(user.model_dump())

      # Salve as alterações no banco de dados
      edited_user = db_instance.edit("users", id, existing_user)

      return edited_user
    except DuplicateKeyError:
      raise HTTPException(status_code=500, detail="Erro interno do servidor")


  @staticmethod
  def delete_user(id: str, password: str):
    user = UserService.get_user(id)
    if user["password"] == password:
      deleted_user = db_instance.delete("users", id)
    else:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Senha incorreta. A conta não foi deletada.")
    if not deleted_user:
      raise HTTPException(status_code=404, detail="User not found")
    
    return deleted_user
  
  @staticmethod
  def delete_all_users():
    db_instance.delete_all_users()
  
  @staticmethod
  def get_user_by_username(username: str):
    user = db_instance.get_by_username("users", username)
    
    if not user:
      return None
    
    return user
  
  @staticmethod
  def get_user_by_email(email: str):
    user = db_instance.get_by_email("users", email)
    
    if not user:
      return None
    
    return user
  
  @staticmethod
  def email_exists(email: str):
    return db_instance.find_one("users", {"email": email}) is not None
  
  @staticmethod
  def username_exists(username: str):
    return db_instance.find_one("users", {"username": username}) is not None
  
  @staticmethod
  async def save_profile_picture(user_id: str, profile_picture: UploadFile):
    contents = await profile_picture.read()
    # Salvar a foto de perfil no MongoDB
    result = db_instance.save_image("users", user_id, contents)
    return result
  
  @staticmethod
  def get_profile_picture(user_id: str) -> StreamingResponse:
      try:
          profile_picture = db_instance.get_image("users", user_id)
          return profile_picture

      except Exception as e:
          raise HTTPException(status_code=404, detail=f"Image not found: {str(e)}")
