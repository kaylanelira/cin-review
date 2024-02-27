from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.review import router as review_router
from routers.user import router as user_router
from routers.discipline import router as discipline_router
from routers.library import router as library_router

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(library_router, prefix="/library")
app.include_router(review_router, prefix="/review")
app.include_router(user_router, prefix="/user")
app.include_router(discipline_router, prefix="/discipline")