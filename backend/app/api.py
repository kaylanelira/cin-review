from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.review import router as review_router
from src.routers.user import router as user_router

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

app.include_router(review_router, prefix="/review")
app.include_router(user_router, prefix="/user")
