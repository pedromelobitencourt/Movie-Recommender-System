from fastapi import FastAPI
from routes.clustering import router as clustering_router
from routes.prediction import router as prediction_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Movie Clustering API", version="1.0")

app.include_router(prediction_router)
app.include_router(clustering_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Substitua "*" por domínios específicos, se necessário
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP
    allow_headers=["*"],  # Permite todos os cabeçalhos
)
