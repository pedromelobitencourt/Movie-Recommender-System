from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
import pickle

# Inicializar o roteador
router = APIRouter()

# Carregar o DataFrame de filmes com clusters
movies = pd.read_csv('./../model/data/tmdb_5000_movies.csv')

# Realizar pré-processamento
credits = pd.read_csv('./../model/data/tmdb_5000_credits.csv')
movies = movies.merge(credits, on='title')
movies = movies[['movie_id','title','overview','genres','keywords','cast','crew']]
movies.dropna(inplace=True)

# Carregar o modelo
with open("./../model/saved_models/movies_clustering.pkl", "rb") as f:
    clustering_model = pickle.load(f)

movies['cluster'] = clustering_model.labels_

# Classe para entrada de dados
class MovieRequest(BaseModel):
    title: str
    num_recommendations: int = 20

# Função para recomendar filmes semelhantes
def recommend_similar_movies(movie_title, num_recommendations=5):
    if movie_title not in movies['title'].values:
        return None  # Filme não encontrado
    
    movie_cluster = movies[movies['title'] == movie_title]['cluster'].values[0]
    similar_movies = movies[movies['cluster'] == movie_cluster]
    similar_movies = similar_movies[similar_movies['title'] != movie_title]
    
    return similar_movies[['title', 'movie_id']].head(num_recommendations)

# Rota para recomendação de filmes
@router.post("/clustering/recommend")
def recommend_movies(request: MovieRequest):
    """
    Rota para recomendar filmes semelhantes com base no título fornecido.
    """
    recommendations = recommend_similar_movies(request.title, request.num_recommendations)
    
    if recommendations is None:
        raise HTTPException(status_code=404, detail="Filme não encontrado.")
    
    return recommendations.to_dict(orient="records")
