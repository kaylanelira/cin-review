from pydantic import BaseModel

class Discipline(BaseModel):
    name: str
    code: str
    department: str 
    semester: int
    professor: str
    description: str
