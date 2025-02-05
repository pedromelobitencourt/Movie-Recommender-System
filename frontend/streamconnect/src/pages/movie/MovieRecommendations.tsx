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
  movieTitle: string;
}

const MovieRecommendations: React.FC<Props> = ({ movieTitle }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8111/clustering/recommend', {
          title: "Avatar",
          num_recommendations: 10,
        });

        const detailedMovies = await Promise.all(
          response.data.map(async (movie: any) => {
            try {
              const movieSearchResponse = await axios.get(
                `http://localhost:3000/movies/search?query=${encodeURIComponent(movie.title)}`
              );
              const movieData = movieSearchResponse.data[0];
              return {
                id: movieData.id,
                title: movieData.title,
                posterPath: movieData.posterPath
                  ? `https://image.tmdb.org/t/p/w500${movieData.posterPath}`
                  : 'https://via.placeholder.com/200x300?text=No+Image',
              };
            } catch (error) {
              console.error(`Erro ao carregar informações do filme "${movie.title}"`, error);
              return null;
            }
          })
        );
        setRecommendedMovies(detailedMovies.filter((movie) => movie !== null));
      } catch (error) {
        console.error('Erro ao buscar recomendações:', error);
      }
    };

    fetchRecommendations();
  }, [movieTitle]);

  return (
    <div className="recommendations-container">
      <h2>Filmes parecidos com este</h2>
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