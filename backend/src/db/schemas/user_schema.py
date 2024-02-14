from src.db.schemas.model_schema import ModelSchema

class User(ModelSchema):
    bson_type: str = "object"
    required: list = [
        "id",
        "name",
        "surname",
        "username",
        "email",
        "password",
        "phone_number",
        "field_of_interest",
    ]
    properties: dict = {
        "id": {"bson_type": "string", "description": "The user's unique identifier"},
        "name": {"bson_type": "string", "description": "The user's name"},
        "surname": {"bson_type": "string", "description": "The user's surname"},
        "username": {"bson_type": "string", "description": "The user's username"},
        "email": {"bson_type": "string", "description": "The user's email"},
        "password": {"bson_type": "string", "description": "The user's password"},
        "phone_number": {"bson_type": "string", "description": "The user's phone number"},
        "field_of_interest": {"bson_type": "string", "description": "The user's field of interest"},
    }

    def get(self) -> dict:
        return {
        "bson_type": self.bson_type,
        "required": self.required,
        "properties": self.properties,
        }