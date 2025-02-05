import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MoviePage.css';
import MovieRecommendations from './MovieRecommendations';

interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  posterPath: string;
  backdropPath: string;
  genres: string[];
}

const MoviePage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies/1`);
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao carregar o filme:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div className="loading">Carregando...</div>;
  }

  // Formatando a data
  const formattedDate = new Date(movie.releaseDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // URLs das imagens
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : null;

  const backdropUrl = movie.backdropPath
    ? `https://image.tmdb.org/t/p/original${movie.backdropPath}`
    : null;

  return (
    <div
      className="movie-page"
      style={{ backgroundImage: `url(${backdropUrl})`, backgroundSize: 'cover' }}
    >
      {/* Overlay para contraste */}
      <div className="overlay">
        <div className="content">
          {/* Poster do filme */}
          {posterUrl && (
            <div className="poster-container">
              <img src={posterUrl} alt={`${movie.title} Poster`} className="poster" />
            </div>
          )}

          {/* Informações do Filme */}
          <div className="movie-info">
            <h1 className="title">{movie.title}</h1>
            <p className="overview">{movie.overview}</p>
            <div className="details">
              <p>
                <strong>Data de Lançamento:</strong> {formattedDate}
              </p>
              <p>
                <strong>Popularidade:</strong> {movie.popularity}
              </p>
              <p>
                <strong>Nota:</strong> {movie.voteAverage} ({movie.voteCount} votos)
              </p>
              <p>
                <strong>Gêneros:</strong> {movie.genres.join(', ')}
              </p>
            </div>
          </div>

          {/* Filmes Recomendados */}
          <MovieRecommendations movieId={1} />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
