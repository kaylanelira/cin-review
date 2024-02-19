from fastapi import APIRouter, HTTPException, status
from typing import List
from schemas.discipline import Discipline
from service.discipline_service import DisciplineService

router = APIRouter(tags=['Discipline'])

@router.post(
    "/disciplines/",
    status_code=status.HTTP_201_CREATED,
    summary="Add a new discipline",
    description="Create a new discipline and add it to the list."
)
def add_discipline_endpoint(discipline: Discipline):
    created_discipline = DisciplineService.add_discipline(discipline)
    if created_discipline:
        return created_discipline
    raise HTTPException(status_code=400, detail="Error while creating discipline")

# O método read_disciplines_endpoint já é não assíncrono

@router.get(
    "/disciplines/{code}",
    response_model=Discipline,
    summary="Get a discipline by code",
    description="Retrieve detailed information of a specific discipline by its unique code."
)
def read_discipline_endpoint(code: str):
    discipline = DisciplineService.get_discipline_by_code(code)
    if discipline:
        return discipline
    raise HTTPException(status_code=404, detail="Discipline not found")

@router.put(
    "/disciplines/{code}",
    response_model=Discipline,
    summary="Update a discipline",
    description="Update the details of an existing discipline by its unique code."
)
def update_discipline_data_endpoint(code: str, discipline: Discipline):
    discipline_data = discipline.dict()
    updated_discipline = DisciplineService.update_discipline(code, discipline_data)
    if updated_discipline:
        return updated_discipline
    raise HTTPException(status_code=404, detail="Discipline not found")

@router.delete(
    "/disciplines/{code}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a discipline",
    description="Remove all disciplines from the system by its unique code."
)
def remove_discipline_endpoint(code: str):
    result = DisciplineService.delete_discipline(code)
    return result

@router.get("/disciplines/by-semester/{semester}", response_model=List[Discipline], summary="Get disciplines by semester", description="Retrieve a list of disciplines for a specific semester.")
def get_disciplines_by_semester(semester: int):
    return DisciplineService.get_disciplines_by_semester(semester)

@router.get("/disciplines/by-department/{department}", response_model=List[Discipline], summary="Get disciplines by department", description="Retrieve a list of disciplines from a specific department.")
def get_disciplines_by_department(department: str):
    return DisciplineService.get_disciplines_by_department(department)

@router.get("/disciplines/by-professor/{professor}", response_model=List[Discipline], summary="Get disciplines by professor", description="Retrieve a list of disciplines taught by a specific professor.")
def get_disciplines_by_professor(professor: str):
    return DisciplineService.get_disciplines_by_professor(professor)

@router.get(
    "/disciplines/",
    response_model=List[Discipline],
    summary="Get all disciplines",
    description="Retrieve a list of all disciplines available in the system."
    )

def get_all_disciplines_endpoint():
    disciplines = DisciplineService.get_all_disciplines()
    if disciplines:
        return disciplines
    raise HTTPException(status_code=404, detail="No disciplines found")