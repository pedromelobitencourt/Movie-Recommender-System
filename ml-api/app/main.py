from fastapi import FastAPI
from app.routes.prediction import router as prediction_router

app = FastAPI()

# Registrar rotas
app.include_router(prediction_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Recommendation API"}
