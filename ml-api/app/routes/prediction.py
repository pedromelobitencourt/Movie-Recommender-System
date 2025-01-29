from fastapi import APIRouter, HTTPException
from app.models.prediction import PredictionRequest
from app.services.predict import make_prediction
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/predict", tags=["Prediction"])
def predict(data: PredictionRequest):
    try:
        logger.info("Received data: %s", data)
        result = make_prediction(data)
        return {"recommendation_score": result}
    except Exception as e:
        logger.error("Error: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))
