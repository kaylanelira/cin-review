from typing import List, Dict
from uuid import uuid4
from pymongo import MongoClient, errors
from pymongo.collection import Collection, IndexModel
from config.config import env
from typing import Dict
from logging import INFO, WARNING, getLogger
from bson.objectid import ObjectId
from fastapi import HTTPException
from pymongo import MongoClient

logger = getLogger("uvicorn")


class Database:
    ID_LENGTH = 8

    def __init__(self):
        self.db = None
        self.connect()

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

        collection.create_indexes(indexes)

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

        items = list(collection.find({}, {"_id": 0}))
        items = list(collection.find())

        for itm in items:
            itm["id"] = str(itm["_id"])

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

        if item is not None:
            # for itm in item
            item["id"] = str(item["_id"])
            del item["_id"]

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

        item = collection.find_one({"_id": ObjectId(item_id)})
        if item is not None:
            item["id"] = str(item["_id"])

        print(item)
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

        item_id = ObjectId(item_id)

        item = collection.find_one({"_id": item_id})

        if not item:
            return None

        print(item)

        return item

    def find(self, collection_name: str, filter) -> dict:
        collection: Collection = self.db[collection_name]

        return collection.find(filter)

    def find_by_id(self, collection_name: str, item_id: str) -> dict:
        item_id = ObjectId(item_id)

        return self.find_one(collection_name, {"_id": item_id})

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
        item["_id"] = str(item["_id"])
        return {"id": str(item_id), **item}

    def edit_by_code(self, collection_name: str, code: str, item: dict) -> dict:
        collection: Collection = self.db[collection_name]
        item = dict(item)
        if any(value == "" for value in item.values()):
            return None
        else:
            result = collection.update_one(
                {"code": code}, {"$set": item})
            if result.modified_count > 0:
                return {
                    **item
                }
            else:
                return None
                
    def edit(self, collection_name: str, item_id: str, item: dict) -> dict:
        collection: Collection = self.db[collection_name]
        item = dict(item)

        if any(value == "" for value in item.values()):
            return None

        else:
            item_id = collection.update_one(
                {"_id": ObjectId(item_id)}, {"$set": item})

            return {
                **item
            }

    def delete(self, collection_name: str, item_id: str) -> dict:
        collection: Collection = self.db[collection_name]

        item = collection.delete_one({"_id": ObjectId(item_id)})

        if item.deleted_count == 0:
            return {
                "id": None
            }

        return {
            'id': item_id
        }
        
    def delete_all(self, collection_name: str):
        """
        Delete all collection

        Returns
        - bool
            True if the collection was dropped and recreated successfully, False otherwise
        """

        if self.drop_collection(collection_name):
            # Create the 'users' collection again if dropped successfully
            self.create_collection(collection_name)
            
            return True

        return False
    
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

        return item