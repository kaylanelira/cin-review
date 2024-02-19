from typing import List, Dict
from schemas.discipline import Discipline
from db import database as db
from bson.objectid import ObjectId
from fastapi import HTTPException

db_instance = db.Database()

class DisciplineService:
    @staticmethod
    def add_discipline(discipline_data: Discipline) -> dict:
        return db_instance.add("disciplines", discipline_data.dict())

    @staticmethod
    def get_discipline_by_code(code: str) -> Discipline:
        discipline = db_instance.find_one("disciplines", {"code": code})
        if discipline:
            discipline['id'] = str(discipline['_id'])
            del discipline['_id']
        return discipline

    @staticmethod
    def get_all_disciplines() -> List[Discipline]:
        return db_instance.get_all_items("disciplines")

    @staticmethod
    def update_discipline(code: str, discipline_data: dict):
        filter_query = {"code": code}
        update_data = {"$set": discipline_data}

        result = db_instance.edit("disciplines", filter_query, update_data)

        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Discipline not found or couldn't be updated.")
        
        return discipline_data
    
    @staticmethod
    def get_all_disciplines():
        disciplines = db_instance.get_all_items("disciplines")
        for discipline in disciplines:
            discipline['_id'] = str(discipline['_id'])
        return disciplines
    
    @staticmethod
    def delete_discipline(code: str):
        collection = db_instance.get_db()["disciplines"]
        delete_result = collection.delete_many({"code": code})
        if delete_result.deleted_count > 0:
            return {"detail": f"{delete_result.deleted_count} discipline(s) successfully deleted"}
        else:
            raise HTTPException(status_code=404, detail="No disciplines found with the provided code")

    @staticmethod
    def get_disciplines_by_semester(semester: int) -> List[Dict]:
        disciplines = list(db_instance.find("disciplines", {"semester": semester}))
        for discipline in disciplines:
            discipline['id'] = str(discipline['_id'])
            del discipline['_id']
        return disciplines

    @staticmethod
    def get_disciplines_by_department(department: str) -> List[Dict]:
        disciplines = list(db_instance.find("disciplines", {"department": department}))
        for discipline in disciplines:
            discipline['id'] = str(discipline['_id'])
            del discipline['_id']
        return disciplines

    @staticmethod
    def get_disciplines_by_professor(professor: str) -> List[Dict]:
        disciplines = list(db_instance.find("disciplines", {"professor": professor}))
        for discipline in disciplines:
            discipline['id'] = str(discipline['_id'])
            del discipline['_id']
        return disciplines
    
    @staticmethod
    def get_all_disciplines_alphabetically():
        disciplines = db_instance.get_all_items("disciplines")
        disciplines = sorted(disciplines, key=lambda x: x['name'])
        for discipline in disciplines:
            discipline['_id'] = str(discipline['_id'])
        return disciplines
    
    @staticmethod
    def get_disciplines_by_search(substring: str):
        disciplines = db_instance.get_all_items("disciplines")
        matching_disciplines = [discipline for discipline in disciplines if substring.lower() in discipline['name'].lower()]
        for matching_discipline in matching_disciplines:
            matching_discipline['_id'] = str(matching_discipline['_id'])
        return matching_disciplines     