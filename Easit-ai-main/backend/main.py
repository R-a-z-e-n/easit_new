from fastapi import FastAPI, Depends, WebSocket, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json
import uuid
from typing import List, Optional
from pydantic import BaseModel

try:
    from backend import models, database
    from backend.database import engine, get_db
except ImportError:
    import models, database
    from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Easit.ai API is running. Access endpoints at /api/..."}

@app.get("/api")
def read_api_root():
    return {
        "status": "online",
        "version": "1.0.0",
        "endpoints": ["/api/auth/login", "/api/auth/signup", "/api/conversations"]
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    token: str
    user: dict

@app.post("/api/auth/signup", response_model=Token)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = models.User(email=user.email, name=user.name, hashed_password=user.password) # In real app, hash password
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"token": "demo-token-" + str(new_user.id), "user": {"email": new_user.email, "name": new_user.name}}

@app.post("/api/auth/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or db_user.hashed_password != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    return {"token": "demo-token-" + str(db_user.id), "user": {"email": db_user.email, "name": db_user.name}}

@app.post("/api/auth/google", response_model=Token)
def google_auth(credential: dict):
    # Mock google auth
    return {"token": "demo-google-token", "user": {"email": "google@example.com", "name": "Google User"}}

@app.get("/api/conversations")
def get_conversations(db: Session = Depends(get_db)):
    # In a real app, verify token and get owner_id
    convs = db.query(models.Conversation).all()
    result = []
    for c in convs:
        result.append({
            "id": c.id,
            "title": c.title,
            "messages": json.loads(c.messages)
        })
    return result

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        message = json.loads(data)
        # Handle message (echo for now)
        await websocket.send_text(json.dumps({"type": "message", "payload": message}))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)