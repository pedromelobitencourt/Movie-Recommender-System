import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MovieRecommendations.css';

interface Movie {
  id: number;
  title: string;
  posterPath: string;
}

interface Props {
  userId: number;
}

const MovieRecommendations: React.FC<Props> = ({ userId }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8111/prediction/recommend', {
          user_id: 1,
          num_recommendations: 10,
        });

        const movies = response.data.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          posterPath: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image',
        }));

        setRecommendedMovies(movies);
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div className="recommendations-container">
      <h2>Filmes Recomendados</h2>
      <div className="recommendations-grid">
        {recommendedMovies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`} className="recommendation-card">
            <img src={movie.posterPath} alt={movie.title} />
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
