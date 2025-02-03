from fastapi import FastAPI
from routes.clustering import router as clustering_router
from routes.prediction import router as prediction_router

app = FastAPI(title="Movie Clustering API", version="1.0")

app.include_router(prediction_router)
app.include_router(clustering_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8111)
