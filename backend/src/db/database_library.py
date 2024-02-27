from typing import List, Dict
# from uuid import uuid4
from pymongo import MongoClient, errors
from pymongo.collection import Collection, IndexModel
from config.config import env
from typing import Dict
from logging import INFO, WARNING, getLogger
from bson.objectid import ObjectId
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
                f'Server Version: {mongo_connection.server_info()["version"]}')
            print("--------------------")

        except errors.ServerSelectionTimeoutError as err:
            mongo_connection = None
            logger.setLevel(WARNING)
            logger.info(f'MongoDB connection error! {err}')

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

        collection_options = {"validator": {"$jsonSchema": validation_schema}}

        collection: Collection = self.db.create_collection(
            name, **collection_options)

        collection.create_indexes(indexes)

        logger.info(f"Collection {name} created!")

        return collection

    def drop_collection(self, name) -> bool:

        if name in self.db.list_collection_names():
            self.db.drop_collection(name)
            logger.info(f'Collection {name} dropped!')
            return True

        return False

    def get_all(self, collection_name: str) -> dict:

        collection: Collection = self.db[collection_name]
        folders = collection.find()

        result = []
        for i in folders:
            del i["_id"]
            result.append(i)

        return result

    def get_by_userID(self, collection_name: str, user_id: str) -> dict | None:
        collection: Collection = self.db[collection_name]

        library = collection.find({"user_id": user_id})

        if not library:
            return None
        
        result = []
        for i in library:
            del i["_id"]
            result.append(i)

        return result
    
    def get_by_name_and_user(self, collection_name: str, folder_name: str, user_id: str) -> dict | None:
        collection: Collection = self.db[collection_name]

        folder = collection.find_one({"user_id": user_id, "name": folder_name})
        
        if not folder:
            return None
        return folder

    def add(self, collection_name: str, folder: dict) -> dict:

        collection: Collection = self.db[collection_name]

        collection.insert_one(folder)
        return {**folder}

    def edit(self, collection_name: str, original_name: str, updated_folder: dict) -> dict | None:
        collection: Collection = self.db[collection_name]

        if any(value == "" for value in updated_folder.values()):
            return None
        else:
            collection.update_one(
                filter={"user_id": updated_folder["user_id"], "name": original_name}, update={"$set": updated_folder})

            return {**updated_folder}

    def delete_by_name_and_user(self, collection_name: str, folder: dict) -> bool:
        collection: Collection = self.db[collection_name]

        folder = collection.delete_one({"name": folder["name"], "user_id": folder["user_id"]})

        if folder.deleted_count == 0:
            return False
        return True
    
    def delete_user_library(self, collection_name: str, user_id: str) -> bool:
        collection: Collection = self.db[collection_name]

        folder = collection.delete_many(filter={"user_id": user_id})

        if folder.deleted_count == 0:
            return False
        return True

    def delete_all(self, collection_name: str) -> bool:
        collection: Collection = self.db[collection_name]
        collection.delete_many(filter={})
        return
