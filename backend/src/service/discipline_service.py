from typing import List, Dict
from schemas.discipline import Discipline
from db import database as db
from bson.objectid import ObjectId
from fastapi import HTTPException

db_instance = db.Database()

class DisciplineService:

    @staticmethod
    def add_discipline(discipline_data: Discipline) -> dict:
        if not discipline_data.is_complete():
            return {'message': "Fill in all the fields."}
        existing_discipline = db_instance.find_one("disciplines", {"semester": discipline_data.semester, "code": discipline_data.code})
        if existing_discipline:
            return {'message': "Discipline already added."}
        insert_result = db_instance.add("disciplines", discipline_data.dict())
        if insert_result:
            return {"message": "Discipline added successfully.", "details": insert_result}
        else:
            raise HTTPException(status_code=500, detail="Failed to add discipline.")

    @staticmethod
    def get_discipline_by_code(code: str):
        discipline = db_instance.find_one("disciplines", {"code": code})
        if discipline:
            discipline['id'] = str(discipline['_id'])
            del discipline['_id']
            return discipline
        else:
            return {"message": "Discipline code does not exist."}

    @staticmethod
    def get_all_disciplines() -> List[Discipline]:
        return db_instance.get_all_items("disciplines")

    @staticmethod
    def update_discipline(id: str, discipline_data: dict):
        for key, value in discipline_data.items():
            if isinstance(value, str) and not value.strip():
                return {"message": "Fill in all the fields."}

        updated_data = db_instance.edit("disciplines", id, discipline_data)

        if updated_data is None:
            raise HTTPException(status_code=400, detail="Invalid data provided for update.")
        
        return {"message": "Discipline updated successfully.", "details": updated_data}

    @staticmethod
    def update_discipline_by_code(code: str, discipline_data: dict):
        for key, value in discipline_data.items():
            if isinstance(value, str) and not value.strip():
                raise HTTPException(status_code=400, detail="Fill in all the fields.")
        
        updated_data = db_instance.edit_by_code("disciplines", code, discipline_data)
        
        if updated_data is None:
            raise HTTPException(status_code=404, detail="Discipline not found.")
        
        return updated_data

    @staticmethod
    def get_all_disciplines():
        disciplines = db_instance.get_all_items("disciplines")
        for discipline in disciplines:
            discipline['_id'] = str(discipline['_id'])
        return disciplines
    

    @staticmethod
    def delete_discipline(code: str):
        message = f"Deleting discipline with code: {code}"

        collection = db_instance.get_db()["disciplines"]
        delete_result = collection.delete_many({"code": code})
        if delete_result.deleted_count > 0:
            return {"detail": f"{delete_result.deleted_count} discipline(s) successfully deleted."}
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