from typing import Any

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import os

app = FastAPI()
os.makedirs("notes.txt", exist_ok=True)

class Query(BaseModel):
    text: str

@app.get("/retrieve")
async def retrieve():
    text = open("notes.txt", 'r').read()
    return text

@app.get("/health")
async def health():
    """Check the api is running"""
    return {"status": "🤙"}
    

if __name__ == "__main__":
    uvicorn.run(
        "notestore:app",
        host="localhost",
        port=8008,
        reload=True
    )