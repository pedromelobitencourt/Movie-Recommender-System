from pydantic import BaseModel
from typing import List

class UserFeatures(BaseModel):
    totalInteractions: int
    totalWatchTime: int
    age: int
    gender: str
    preferredGenres: List[str]

class MovieFeatures(BaseModel):
    movieGenres: List[str]

class PredictionRequest(BaseModel):
    user_features: UserFeatures
    movie_features: MovieFeatures
