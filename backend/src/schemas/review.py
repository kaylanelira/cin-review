from pydantic import BaseModel

class ReviewModel(BaseModel):
	username: str
	discipline: str
	rating: int
	comment: str