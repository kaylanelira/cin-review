from fastapi import APIRouter, HTTPException, status
from typing import List
from schemas.discipline import Discipline
from service.discipline_service import DisciplineService

router = APIRouter(tags=['Discipline'])

@router.post("/add",
             status_code=status.HTTP_201_CREATED,
             summary="Add a new discipline",
             description="Create a new discipline and add it to the list.")
def add_discipline(discipline: Discipline):
    created_discipline = DisciplineService.add_discipline(discipline)
    return created_discipline

@router.get("/by_code/{code}",
            response_model=Discipline,
            summary="Get a discipline by code",
            description="Retrieve detailed information of a specific discipline by its unique code.")
def read_discipline(code: str):
    discipline = DisciplineService.get_discipline_by_code(code)
    if discipline:
        return discipline
    raise HTTPException(status_code=404, detail="Discipline not found")

@router.put("/by_code/{code}",
            response_model=Discipline,
            summary="Update a discipline",
            description="Update the details of an existing discipline by its unique code.")
def update_discipline_data(code: str, discipline: Discipline):
    discipline_data = discipline.dict()
    updated_discipline = DisciplineService.update_discipline(code, discipline_data)
    if updated_discipline:
        return updated_discipline
    raise HTTPException(status_code=404, detail="Discipline not found")

@router.put(
    "/code/{code}",
    response_model=Discipline,
    summary="Update a discipline",
    description="Update the details of an existing discipline by its unique code."
)
def update_discipline_by_code(code: str, discipline: Discipline):
    discipline_data = discipline.dict()
    updated_discipline = DisciplineService.update_discipline_by_code(code, discipline_data)
    return updated_discipline

@router.delete(
    "/by_code/{code}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a discipline",
    description="Remove all disciplines from the system by its unique code."
)
async def remove_discipline(code: str):
    return DisciplineService.delete_discipline(code)

@router.delete(
    "/code/{code}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a discipline",
    description="Remove all disciplines from the system by its unique code."
)
async def remove_discipline(code: str):
    return DisciplineService.delete_discipline(code)

@router.get("/by-semester/{semester}", response_model=List[Discipline], summary="Get disciplines by semester", description="Retrieve a list of disciplines for a specific semester.")
def get_disciplines_by_semester(semester: int):
    return DisciplineService.get_disciplines_by_semester(semester)

@router.get("/by-department/{department}", 
            response_model=List[Discipline], 
            summary="Get disciplines by department", 
            description="Retrieve a list of disciplines from a specific department.")
def get_disciplines_by_department(department: str):
    return DisciplineService.get_disciplines_by_department(department)

@router.get("/by-professor/{professor}", 
            response_model=List[Discipline], 
            summary="Get disciplines by professor", 
            description="Retrieve a list of disciplines taught by a specific professor.")
def get_disciplines_by_professor(professor: str):
    return DisciplineService.get_disciplines_by_professor(professor)

@router.get("/get_all", 
            tags=['Discipline'], 
            summary="Get all disciplines", 
            response_model=List[Discipline])
async def get_all_disciplines():
    return DisciplineService.get_all_disciplines()

@router.get("/get_all_alphabetically", 
            tags=['Discipline'], 
            summary="Get all disciplines alphabetically", 
            response_model=List[Discipline])
async def get_all_disciplines_alphabetically():
    return DisciplineService.get_all_disciplines_alphabetically()

@router.get("/get_disciplines_by_search/{substring}", 
            tags=['Discipline'], 
            summary="Get disciplines results from search", 
            response_model=List[Discipline])
async def get_disciplines_by_search(substring: str):
    return DisciplineService.get_disciplines_by_search(substring)