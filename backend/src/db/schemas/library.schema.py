from db.schemas.model_schema import ModelSchema

class Folder(ModelSchema):
    bson_type: str = "object"
    required: list = [
        "name",
        "user_id"
    ]
    properties: dict = {
        "user_id": {"bson_type": "string", "description": "The user's unique identifier"},
        "name": {"bson_type": "string", "description": "The folder's name"},
        "classes_id": {"bson_type": "string", "description": "The IDs of the classes in the folder"},
        "image": {"bson_type": "binData", "description": "Binary image data"}, ##
    }

    def get(self) -> dict:
        return {
        "bson_type": self.bson_type,
        "required": self.required,
        "properties": self.properties,
        }