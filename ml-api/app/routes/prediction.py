from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model

import sys
import os
sys.path.append(os.path.abspath("./../model/saved_models"))

from recommender_net import RecommenderNet

# Inicializar o roteador
router = APIRouter()

# Carregar os dados necessários
movie_df = pd.read_csv('./../model/data/tmdb_5000_movies.csv')
ratings_df = pd.read_csv('./../model/data/ratings.csv')

# Mapeamento de usuários e filmes
user_ids = ratings_df["userId"].unique().tolist()
user2user_encoded = {x: i for i, x in enumerate(user_ids)}
user_encoded2user = {i: x for i, x in enumerate(user_ids)}

movie_ids = movie_df["id"].unique().tolist()
movie2movie_encoded = {x: i for i, x in enumerate(movie_ids)}
movie_encoded2movie = {i: x for i, x in enumerate(movie_ids)}

# Carregar o modelo de recomendação
MODEL_PATH = "./../model/saved_models/movie_recommender.keras"
model = load_model(MODEL_PATH)

# Classe para entrada de dados
class RecommendationRequest(BaseModel):
    user_id: int
    num_recommendations: int = 20

def recommend_movies_for_user(user_id, num_recommendations=20):
    # Verificar se o usuário está mapeado
    if user_id not in user2user_encoded:
        # Calcular as médias de avaliação considerando apenas filmes presentes no movie_df
        movie_ids_in_dataset = set(movie_df["id"])
        movie_ratings_mean = (
            ratings_df[ratings_df["movieId"].isin(movie_ids_in_dataset)]
            .groupby("movieId")["rating"]
            .mean()
            .sort_values(ascending=False)
        )

        # Selecionar os melhores filmes
        top_movies = movie_ratings_mean.head(num_recommendations).index
        recommended_movies = movie_df[movie_df["id"].isin(top_movies)]

        # Garantir que seja um DataFrame antes de chamar to_dict
        if not recommended_movies.empty:
            return recommended_movies[['title', 'id']].head(num_recommendations)
        else:
            return []

    # Codificar o usuário
    user_encoder = user2user_encoded[user_id]

    # Filmes assistidos pelo usuário
    movies_watched_by_user = ratings_df[ratings_df.userId == user_id]

    # Identificar filmes não assistidos
    movies_not_watched = movie_df[~movie_df["id"].isin(movies_watched_by_user.movieId.values)]["id"]
    movies_not_watched = list(set(movies_not_watched).intersection(set(movie2movie_encoded.keys())))

    if not movies_not_watched:
        raise HTTPException(status_code=404, detail="Nenhum filme disponível para recomendação.")

    # Codificar filmes não assistidos
    movies_not_watched_encoded = [[movie2movie_encoded.get(x)] for x in movies_not_watched]

    # Criar matriz de entrada para predição
    user_movie_array = np.hstack(
        ([[user_encoder]] * len(movies_not_watched_encoded), movies_not_watched_encoded)
    )

    # Fazer predições
    ratings = model.predict(user_movie_array).flatten()

    # Selecionar os melhores filmes
    top_ratings_indices = ratings.argsort()[-num_recommendations:][::-1]
    recommended_movie_ids = [movie_encoded2movie.get(movies_not_watched_encoded[x][0]) for x in top_ratings_indices]

    # Obter informações dos filmes recomendados
    recommended_movies = movie_df[movie_df["id"].isin(recommended_movie_ids)]
    return recommended_movies[['title', 'id']].to_dict(orient="records")

# Rota para recomendação de filmes
@router.post("/prediction/recommend")
def recommend_movies(request: RecommendationRequest):
    """
    Rota para recomendar filmes com base no ID do usuário.
    """
    recommendations = recommend_movies_for_user(request.user_id, request.num_recommendations)
    
    if recommendations is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    return recommendations.to_dict(orient="records")
