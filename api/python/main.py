from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import gunicorn
from pydantic import BaseModel
import numpy as np
from image_scrap_bs4 import get_images_with_headers

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# pydantic models


class request_body_image_scrap(BaseModel):
    query: str


@app.get("/")
def welcome():
    return {"ping": "Hello. This is the documentation for One Stop. Go to /docs to see the Swagger documentation"}


@app.post("/get_scraped_images", status_code=200)
def get_scraped_images(data: request_body_image_scrap):
    '''
    Fetches scraped images for a query from Google Images Search. Uses Beautiful Soup.
    '''

    images = get_images_with_headers(data.query)
    print(data.query)
    print(images)

    if not images:
        raise HTTPException(
            status_code=400, detail="Images could not be fetched")

    return {'images': images}
