from fastapi import FastAPI, HTTPException
from typing import List
import joblib
import numpy as np
from pydantic import BaseModel
from sklearn.preprocessing import LabelEncoder
import pandas as pd

app = FastAPI()

# Carregar o modelo treinado
model = joblib.load("model/user_recommendation_model.pkl")

GENRE_MAPPING = [
    'Ação',
    'Aventura',
    'Animação',
    'Comédia',
    'Crime',
    'Documentário',
    'Drama',
    'Família',
    'Fantasia',
    'História',
    'Terror',
    'Música',
    'Mistério',
    'Romance',
    'Ficção científica',
    'Cinema TV',
    'Thriller',
    'Guerra',
    'Faroeste',
]

class PredictionRequest(BaseModel):
    user_id: str  # ID do usuário
    movie_id: str  # ID do filme
    age: int
    gender: str
    preferredGenres: List[str]
    totalInteractions: int
    totalWatchTime: int
    movieGenres: List[str]  # Gêneros do filme

# Supondo que você tenha os dados originais de usuários e filmes
users = pd.read_csv("./model/users.csv")
movies = pd.read_csv("./model/movies.csv")

# Codificadores para user_id e movie_id (usados no treinamento)
user_encoder = LabelEncoder()
user_encoder.fit(users["id"])
movie_encoder = LabelEncoder()
movie_encoder.fit(movies["movieId"])

@app

@app.post("/predict")
def predict(data: PredictionRequest):
    try:
        # Codificar user_id e movie_id
        user_id_encoded = user_encoder.transform([data.user_id])[0]
        movie_id_encoded = movie_encoder.transform([data.movie_id])[0]

        # Processar user_features (APENAS age + gêneros)
        user_features = [data.age]

        # Codificar gêneros do usuário (multi-hot)
        genres = ["Action", "Adventure", "Animation", "Comedy", "Crime",
                  "Drama", "Fantasy", "Horror", "Sci-Fi", "Thriller"]
        user_genres_encoded = [1 if genre in data.preferredGenres else 0 for genre in genres]

        # Combine user_features (age + gêneros)
        input_user = user_features + user_genres_encoded  # Total: 1 + 10 = 11

        # Processar movie_features (gêneros do filme)
        movie_genres_encoded = [1 if genre in data.movieGenres else 0 for genre in genres]

        # Combinar todas as features
        input_data = {
            "user_id": np.array([user_id_encoded]),
            "movie_id": np.array([movie_id_encoded]),
            "user_features": np.array([input_user]),
            "movie_features": np.array([movie_genres_encoded])
        }

        # Fazer a previsão
        prediction = model.predict(input_data)[0][0]
        return {"recommendation_score": float(prediction)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))