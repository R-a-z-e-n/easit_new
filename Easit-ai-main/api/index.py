from fastapi import FastAPI, Depends, WebSocket, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_all, Column, Integer, String, Text, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker
import json
import uuid
import os
from typing import List, Optional
from pydantic import BaseModel

# Database setup for serverless (SQLite for demo, use Postgres in prod)
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./easit_vercel.db")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String)

class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(String, primary_key=True, index=True)
    title = Column(String)
    messages = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

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
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(email=user.email, name=user.name, hashed_password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"token": "demo-token-" + str(new_user.id), "user": {"email": new_user.email, "name": new_user.name}}

@app.post("/api/auth/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or db_user.hashed_password != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    return {"token": "demo-token-" + str(db_user.id), "user": {"email": db_user.email, "name": db_user.name}}

@app.post("/api/auth/google", response_model=Token)
def google_auth(credential: dict):
    return {"token": "demo-google-token", "user": {"email": "google@example.com", "name": "Google User"}}

@app.get("/api/conversations")
def get_conversations(db: Session = Depends(get_db)):
    convs = db.query(Conversation).all()
    result = []
    for c in convs:
        result.append({
            "id": c.id,
            "title": c.title,
            "messages": json.loads(c.messages)
        })
    return result

# Note: WebSocket support on Vercel is limited. 
# For production, use a dedicated server for WebSockets or a service like Pusher/Ably.
