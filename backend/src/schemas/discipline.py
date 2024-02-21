from pydantic import BaseModel

class Discipline(BaseModel):
    name: str
    code: str
    department: str 
    semester: int
    professor: str
    description: str


    def is_complete(self) -> bool:
        required_fields = ['name', 'code', 'department', 'semester', 'professor', 'description']
        for field in required_fields:
            field_value = getattr(self, field, None)
            if isinstance(field_value, str):
                if field_value.strip() == '':
                    return False
            elif field_value is None:
                return False
        return True