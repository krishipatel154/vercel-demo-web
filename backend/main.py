from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="TechBit Backend", version="1.0")

# Allow your Vercel frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production change to your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    name: str
    email: str
    message: str

class HealthResponse(BaseModel):
    status: str
    message: str

@app.get("/", response_model=HealthResponse)
async def root():
    return {"status": "ok", "message": "FastAPI backend is LIVE on Render!"}

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

@app.post("/api/contact")
async def contact(data: Message):
    # Here you can save to DB later
    print(f"New message from {data.name} ({data.email}): {data.message}")
    return {"success": True, "received": data.dict()}