from io import BytesIO
from typing import List, Dict
from uuid import uuid4
from fastapi.responses import StreamingResponse
from gridfs import GridFS
from pymongo import MongoClient, errors
import pymongo
from pymongo.collection import Collection, IndexModel
from config.config import env
from typing import Dict
from logging import INFO, WARNING, getLogger
from bson.objectid import ObjectId
from fastapi import HTTPException, UploadFile
from pymongo import MongoClient
from PIL import Image

logger = getLogger("uvicorn")


class Database:
    ID_LENGTH = 8

    def __init__(self):
        self.db = None
        self.connect()
        
        # inicializando GridFS para imagens
        self.fs = GridFS(self.db)
        
    def connect(self):
        try:
            mongo_connection = MongoClient(env.DB_URL)

            logger.setLevel(INFO)

            self.db = mongo_connection[env.DB_NAME]

            print("--------------------")
            logger.info("MongoDB connected!")
            logger.info(
                f"Server Version: {mongo_connection.server_info()['version']}")
            print("--------------------")

        except errors.ServerSelectionTimeoutError as err:
            mongo_connection = None
            logger.setLevel(WARNING)
            logger.info(f"MongoDB connection error! {err}")

    def close_connection(self):
        print("--------------------")
        logger.info("MongoDB connection closed!")
        print("--------------------")
        self.db.client.close()

    def get_db(self):
        return self.db

    def create_collection(
        self, name: str, indexes: List[IndexModel] = [], validation_schema: Dict = {}
    ) -> Collection:
        """
        Create a collection

        Parameters
        - name : str
            The name of the collection to create
        - indexes : List[IndexModel]
            The indexes to create in the collection
        - validation_schema : dict
            The validation schema used to validate data inserted into the
            collection. It should be a dictionary representing a JSON Schema

        Returns
        - pymongo.collection.Collection
            The created collection

        Raises
        - TypeError: If indexes is not a list of pymongo.IndexModel

        """

        if indexes is None:
            indexes = []

        collection_options = {"validator": {"$jsonSchema": validation_schema}}

        collection: Collection = self.db.create_collection(
            name, **collection_options)

        # Adicione um índice no campo 'username' como exemplo
        default_index = IndexModel([("username", pymongo.ASCENDING)])
        collection.create_indexes([default_index] + indexes)

        logger.info(f"Collection {name} created!")

        return collection

    def drop_collection(self, name) -> bool:
        """
        Drop a collection

        Parameters
        - name : str
            The name of the collection to drop

        Returns
        - bool
            True if the collection was dropped successfully, False otherwise

        """

        if name in self.db.list_collection_names():
            self.db.drop_collection(name)
            logger.info(f"Collection {name} dropped!")
            return True

        return False

    def get_all_items(self, collection_name: str) -> list:
        """
        Get all items from a collection

        Parameters:
        - collection_name: str
            The name of the collection

        Returns:
        - list
            A list of all items in the collection

        """

        collection: Collection = self.db[collection_name]

        items = list(collection.find({}, {"id": 0}))
        items = list(collection.find())

        for itm in items:
            itm["id"] = str(itm["id"])

        # print(items)
        return items

    def get_by_username(self, collection_name: str, username: str) -> dict:
        """
        Retrieve an item by its ID from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item_id: str
            The ID of the item to retrieve

        Returns:
        - dict or None:
            The item if found, None otherwise

        """
        collection: Collection = self.db[collection_name]

        item = collection.find_one({"username": str(username)})

        # if item is not None:
        #     # for itm in item
        #     item["id"] = str(item["_id"])
        #     del item["_id"]

        return item
    
    def get_by_email(self, collection_name: str, email: str) -> dict:
        """
        Retrieve an item by its ID from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item_id: str
            The ID of the item to retrieve

        Returns:
        - dict or None:
            The item if found, None otherwise

        """
        collection: Collection = self.db[collection_name]

        item = collection.find_one({"email": email})

        # if item is not None:
        #     # for itm in item
        #     item["id"] = str(item["_id"])
        #     del item["_id"]

        return item

    def get_item_by_id(self, collection_name: str, item_id: str) -> dict:
        """
        Retrieve an item by its ID from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item_id: str
            The ID of the item to retrieve

        Returns:
        - dict or None:
            The item if found, None otherwise

        """
        collection: Collection = self.db[collection_name]

        item = collection.find_one({"id": item_id})
        
        return item

    def insert_item(self, collection_name: str, item: dict) -> dict:
        """
        Insert an item into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item: dict
            The item to insert

        Returns:
        - dict:
            The inserted item

        """
        # TODO: test if this method works

        item["id"] = str(uuid4())[: self.ID_LENGTH]

        collection: Collection = self.db[collection_name]

        item_id = collection.insert_one(item).inserted_id
        return {"id": str(item_id), **item}

    def get_by_id(self, collection_name: str, item_id: str) -> dict:
        collection: Collection = self.db[collection_name]

        item = collection.find_one({"id": item_id})

        if not item:
            return None

        return item

    def find(self, collection_name: str, filter) -> dict:
        collection: Collection = self.db[collection_name]

        return collection.find(filter)

    def find_by_id(self, collection_name: str, item_id: str) -> dict:
        return self.find_one(collection_name, {"id": item_id})

    def find_one(self, collection_name: str, filter) -> dict:
        collection: Collection = self.db[collection_name]

        return collection.find_one(filter)

    def add(self, collection_name: str, item: dict) -> dict:
        """
        Insert an item into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item: dict
            The item to insert

        Returns:
        - dict:
            The inserted item

        """

        collection: Collection = self.db[collection_name]

        item = dict(item)

        item_id = collection.insert_one(item).inserted_id
        item["id"] = str(item["id"])
        return {"id": str(item_id), **item}

    def edit(self, collection_name: str, item_id: str, item: dict) -> dict:
        collection: Collection = self.db[collection_name]
        item = dict(item)

        if any(value == "" for value in item.values()):
            return None
        else:
            item_id = collection.update_one(
                {"id": item_id}, {"$set": item})

            print(f"Usuário atualizado no banco de dados: {item}")
            return {
                **item
            }

    def delete(self, collection_name: str, item_id: str) -> dict:
        collection: Collection = self.db[collection_name]

        item = collection.delete_one({"id": item_id})

        if item.deleted_count == 0:
            return {
                "id": None
            }

        return {
            'id': item_id
        }
        
    def delete_all_users(self):
        """
        Delete all users in the 'users' collection

        Returns
        - bool
            True if the 'users' collection was dropped and recreated successfully, False otherwise
        """
        users_collection_name = 'users'

        if self.drop_collection(users_collection_name):
            # Create the 'users' collection again if dropped successfully
            self.create_collection(users_collection_name)

            logger.info(f"All users deleted from the 'users' collection!")
            return True

        return False
    
    def save_image(self, collection_name: str, user_id: str, image_data: bytes) -> dict:
        """
        Save an image to a MongoDB collection

        Parameters:
        - collection_name: str
            The name of the collection where the image will be stored
        - image_data: bytes
            The binary data of the image

        Returns:
        - dict:
            Information about the saved image, including its ID

        """
        try:
            image = Image.open(BytesIO(image_data)).convert("RGB")

            # Convert the image data to a bytes buffer
            image_bytes = BytesIO()
            image.save(image_bytes, format="JPEG")
            image_data = image_bytes.getvalue()

            # Generate a unique ID for the image
            image_id = str(uuid4())[: self.ID_LENGTH]

            # Insert the image into the specified collection
            collection: Collection = self.db[collection_name]
            result = collection.insert_one({"_id": image_id, "user_id": user_id, "data": image_data})

            if result.inserted_id:
                return {"id": str(result.inserted_id)}
            else:
                raise Exception("Failed to save image to the database")

        except Exception as e:
            raise Exception(f"Error saving image to the database: {str(e)}")

    def get_image(self, collection_name: str, user_id: str) -> StreamingResponse:
        try:
            # Encontre o documento na coleção com base no user_id
            collection: Collection = self.db[collection_name]
            document = collection.find_one({"user_id": user_id})

            if document:
                # Obtenha os dados da imagem do documento
                image_data = document.get("data")

                if image_data:
                    # Crie uma StreamingResponse para retornar a imagem
                    return StreamingResponse(content=image_data, media_type="image/jpeg")

                else:
                    raise Exception("Image data not found in the document")

            else:
                raise Exception("Image not found in the database")

        except Exception as e:
            raise Exception(f"Error retrieving image from the database: {str(e)}")
