from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# URL del servicio NLP
NLP_SERVICE_URL = "http://nlp_module:8001"

class TextRequest(BaseModel):
    text: str

class OEIRequest(BaseModel):
    denomination: str
    targetPopulation: str
    expectedEffect: str

class Product(BaseModel):
    denomination: str
    targetPopulation: str
    qualityCriteria: str

class AEIRequest(BaseModel):
    denomination: str
    contributingOEI: str
    products: List[Product]

@app.get("/")
async def root():
    return {"message": "API Gateway funcionando"}

@app.post("/process_text")
async def process_text(request: TextRequest):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{NLP_SERVICE_URL}/process", json={"text": request.text})
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Error al comunicarse con el servicio NLP: {str(e)}")

@app.post("/process_oei")
async def process_oei(request: OEIRequest):
    print(f"OEI request: {request.dict()}")
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{NLP_SERVICE_URL}/process_oei", json=request.dict())
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Error al comunicarse con el servicio NLP: {str(e)}")

@app.post("/process_aei")
async def process_aei(request: AEIRequest):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{NLP_SERVICE_URL}/process_aei", json=request.dict())
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Error al comunicarse con el servicio NLP: {str(e)}")

# Agrega más rutas según sea necesario para tu aplicación