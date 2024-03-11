from Authentication.token import create_jwt_token
from schemas.user import UserCreateModel
from db import database as db
from pymongo.errors import DuplicateKeyError
from fastapi import HTTPException, status

db_instance = db.Database()

class UserService:
  # Retorna todos os usuários
  @staticmethod
  def get_users():
    users = db_instance.get_all_items("users")
    return users

  # Retona user com base no id
  # @staticmethod
  # def get_user(user_id: str):
  #   user = db_instance.find_by_id("users", user_id)

  #   if not user:
  #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

  #   return user
  
  # Retorna user com base no nome de usuário
  @staticmethod
  def get_user_by_username(username: str):
    user = db_instance.get_by_username("users", username)
    
    if not user:
      return None
    
    return user
  
  # Retorna user com base no email
  @staticmethod
  def get_user_by_email(email: str):
    user = db_instance.get_by_email("users", email)
    
    if not user:
      return None
    
    return user

  # Adiciona um user ao banco de dados
  @staticmethod
  def add_user(user: UserCreateModel):
    # verificando informações para criar usuário
    UserService.check_user_requirements(user)
    UserService.check_user_passwords(user)
    UserService.check_user_unique_info(user)
    
    added_user = db_instance.add("users", user.model_dump())
    return added_user

  # Edita usuário no banco de dados
  @staticmethod
  def edit_user(username: str, user: UserCreateModel):
    try:
      existing_user = db_instance.get_by_username("users",username)

      if not existing_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
      
      # verificando se o username e o email são iguais a de algum usuário
      if user.username != existing_user["username"] and UserService.username_exists(user.username):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Nome de usuário indisponivel")
      elif user.email != existing_user["email"] and UserService.email_exists(user.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email indisponivel")
      
      # outras verificações
      UserService.check_user_requirements(user)
      UserService.check_user_passwords(user)

      existing_user.update(user.model_dump())
      id = existing_user["id"]

      # Salve as alterações no banco de dados
      edited_user = db_instance.edit("users", id, existing_user)

      return edited_user
    except DuplicateKeyError:
      raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro interno do servidor")

  # Deleta o user do banco de dados
  @staticmethod
  def delete_user(username: str, password: str):
    user = UserService.get_user_by_username(username)
    
    # verifica se as senhas fornecidas são iguais
    if user["password"] == password:
      deleted_user = db_instance.delete("users", user["id"])
    else:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Senha incorreta. A conta não foi deletada.")
    
    if not deleted_user:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    
    return deleted_user
  
  # verifica se o email existe
  @staticmethod
  def email_exists(email):
    return db_instance.find_one("users", {"email": email}) is not None
  
  # verifica se o username existe
  @staticmethod
  def username_exists(username):
    return db_instance.find_one("users", {"username": username}) is not None
  
  # checagem de campos obrigatórios
  @staticmethod
  def check_user_requirements(user: UserCreateModel):
    if "name" not in user.model_dump() or user.name is None or user.name == "":
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome é um campo obrigatório.")
    elif "username" not in user.model_dump() or user.username is None or user.username == "":
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome de usuário é um campo obrigatório.")
    elif "email" not in user.model_dump() or user.email is None or user.email == "":
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email é um campo obrigatório.")
    elif "password" not in user.model_dump() or user.password is None or user.password == "":
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Senha é um campo obrigatório.")
    elif "repeated_password" not in user.model_dump() or user.repeated_password is None or user.repeated_password == "":
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Repetir a senha é um campo obrigatório.")
    
  # checagem de senhas iguais
  @staticmethod
  def check_user_passwords(user: UserCreateModel):
    if user.password != user.repeated_password:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="As senhas não são iguais.")
    
  # checagem de dados que precisam ser únicos no banco de dados
  @staticmethod
  def check_user_unique_info(user: UserCreateModel):
    if UserService.username_exists(user.username):
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Nome de usuário indisponivel")
    elif UserService.email_exists(user.email):
      raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Email indisponivel")
    
  # TESTE: Deleta todos os usuários do banco de cados
  @staticmethod
  def delete_all_users():
    db_instance.delete_all("users")
  
  @staticmethod
  def login(username: str):
    user = db_instance.get_by_username("users",username)
    
    if user and user["password"] == user["repeated_password"]: 
        # Criação do token JWT
        token_data = {"sub": user["username"]}
        access_token = create_jwt_token(token_data)
        return {"access_token": access_token, "token_type": "bearer", "user": user}
    else:
      raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )