from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from jose import JWTError, jwt

SECRET_KEY = "c1nRev13w"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_jwt_token(data: dict) -> str:
  to_encode = data.copy()
  expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({"exp": expire})
  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_jwt_token(token: str) -> dict:
  try:
      payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
      return payload
  except JWTError:
      return None