from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class OEIData(BaseModel):
    denomination: str
    targetPopulation: str
    expectedEffect: str

class ProductData(BaseModel):
    denomination: str
    targetPopulation: str
    qualityCriteria: str

class AEIData(BaseModel):
    denomination: str
    contributiongOEI: str
    product: List[ProductData]
    
class IndicatorResponse(BaseModel):
    indicators: List[str]

@app.post("/process_oei", response_model=IndicatorResponse)
async def process_oei(text_request: OEIData) -> IndicatorResponse:
    # Aquí se procesa el texto y se generan los indicadores
    # Simulación de procesamiento
    indicators = ["Indicador OEI 1", "Indicador OEI 2", "Indicador OEI 3"]
    return IndicatorResponse(indicators=indicators)

@app.post("/process_aei", response_model=IndicatorResponse)
async def process_aei(text_request: AEIData) -> IndicatorResponse:
    # Aquí se procesa el texto y se generan los indicadores
    # Simulación de procesamiento
    indicators = ["Indicador AEI 1", "Indicador AEI 2", "Indicador AEI 3"]
    return IndicatorResponse(indicators=indicators)

@app.get("/")
async def root():
    return {"message": "NLP Services funcionando"}