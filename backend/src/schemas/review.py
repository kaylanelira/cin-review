from pydantic import BaseModel
from typing import Optional


class ReviewModel(BaseModel):
	username: str
	discipline: str
	rating: int
	comment: str
	time: Optional[str] = None