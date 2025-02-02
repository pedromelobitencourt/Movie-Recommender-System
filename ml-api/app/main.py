from fastapi import FastAPI
from routes.clustering import router as clustering_router

# Inicializa a aplicação FastAPI
app = FastAPI(title="Movie Clustering API", version="1.0")

# Inclui as rotas relacionadas ao clustering
app.include_router(clustering_router)

# Executar o servidor
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8111)
