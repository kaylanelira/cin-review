from db.schemas.model_schema import ModelSchema

class User(ModelSchema):
    bson_type: str = "object"
    required: list = [
        "username",
        "discipline",
        "rating",
        "comment",
        "time",
    ]
    properties: dict = {
        "username": {"bson_type": "string", "description": "The user's username"},
        "discipline": {"bson_type": "string", "description": "The discipline of the review"},
        "rating": {"bson_type": "int", "description": "The rating of the review"},
        "comment": {"bson_type": "string", "description": "The comment of the review"},
        "time": {"bson_type": "string", "description": "The time of the review"},
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties,
        }