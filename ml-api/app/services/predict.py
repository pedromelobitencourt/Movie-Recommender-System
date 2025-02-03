import joblib
import numpy as np

# Carregar o modelo treinado
model = joblib.load("model/user_recommendation_model.pkl")

def make_prediction(data):
    print('dataa', data)

    
    # Processar os dados do usuário
    user_features = [
        data.totalInteractions,
        data.totalWatchTime,
        data.age,
    ]

   # Lista fixa de gêneros (deve ser igual à usada no treinamento)
    genres = ["Action", "Adventure", "Animation", "Comedy", "Crime",
              "Drama", "Fantasy", "Horror", "Sci-Fi", "Thriller"]

    # Codificação dos gêneros (garanta a mesma ordem do treinamento)
    genre_features_user = [1 if genre in data.preferredGenres else 0 for genre in genres]
    genre_features_movie = [1 if genre in data.movieGenres else 0 for genre in genres]

    # Codificação do gênero do usuário
    gender_features = [1 if data.gender == "Male" else 0,
                       1 if data.gender == "Female" else 0]

    # Combine as features
    input_features = user_features + genre_features_user + genre_features_movie + gender_features
    input_data = np.array(input_features).reshape(1, -1)

    # Fazer a previsão
    prediction = model.predict(input_data)[0]
    return prediction
