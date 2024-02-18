from src.db.schemas.model_schema import ModelSchema

class Discipline(ModelSchema):
    bson_type: str = "object"
    required: list = [
        "name",
        "code",
        "department",
        "semester",
        "professor",
        "description",
    ]
    properties: dict = {
        "name": {"bson_type": "string", "description": "The name of the discipline"},
        "code": {"bson_type": "string", "description": "The unique code of the discipline"},
        "department": {"bson_type": "string", "description": "The department offering the discipline"},
        "semester": {"bson_type": "int", "description": "The semester the discipline is offered in"},
        "professor": {"bson_type": "string", "description": "The professor teaching the discipline"},
        "description": {"bson_type": "string", "description": "A brief description of the discipline"},
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties,
        }
