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
  movieId: number;
}

const MovieRecommendations: React.FC<Props> = ({ movieId }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/movies/${movieId}/recommendations`);
        setRecommendedMovies(response.data);
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
      }
    };

    fetchRecommendations();
  }, [movieId]);

  return (
    <div className="recommendations-container">
      <h2>Filmes Recomendados</h2>
      <div className="recommendations-grid">
        {recommendedMovies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`} className="recommendation-card">
            <img src={movie.posterPath || 'https://via.placeholder.com/150'} alt={movie.title} />
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
