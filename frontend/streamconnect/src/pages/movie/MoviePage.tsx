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

const RatingComponent: React.FC<{ movieId: number; userId: number }> = ({ movieId, userId }) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ratings', {
          params: { userId, movieId } // Usar props dinâmicas
        });
        if (response.data) {
          setUserRating(response.data.rating);
        }
      } catch (error) {
        console.error('Erro ao buscar avaliação:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRating();
  }, [movieId, userId]);

  const handleRating = async (rating: number) => {
    try {
      await axios.post('http://localhost:3000/ratings', {
        userId,    // Usar prop userId
        movieId,   // Usar prop movieId
        rating
      });
      setUserRating(rating);
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    }
  };

  const renderStars = () => {
    return [...Array(10)].map((_, i) => {
      const ratingValue = (i + 1) * 0.5;
      return (
        <div
          key={i}
          className={`star ${ratingValue <= (hoverRating || userRating || 0) ? 'filled' : ''}`}
          style={{
            display: 'inline-block',
            width: '12px',
            overflow: 'hidden',
            direction: i % 2 === 0 ? 'ltr' : 'rtl',
          }}
          onMouseEnter={() => setHoverRating(ratingValue)}
          onMouseLeave={() => setHoverRating(null)}
          onClick={() => handleRating(ratingValue)}
        >
          ★
        </div>
      );
    });
  };

  if (loading) return <div>Carregando avaliação...</div>;

  return (
    <div className="rating-container">
      <h3>Sua avaliação:</h3>
      <div className="stars-container">
        {renderStars()}
        <div className="rating-value">
          {userRating ? `(${userRating}/5)` : '(Nenhuma avaliação)'}
        </div>
      </div>
    </div>
  );
};

const MoviePage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const userId = 28; // Deve vir de um contexto de autenticação

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Usar o movieId da URL
        const response = await axios.get(`http://localhost:3000/movies/by-id/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao carregar o filme:', error);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div className="loading">Carregando...</div>;
  }

  const formattedDate = new Date(movie.releaseDate).toLocaleDateString('en', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : null;

  const backdropUrl = movie.backdropPath
    ? `https://image.tmdb.org/t/p/original${movie.backdropPath}`
    : null;

  return (
    <div className="movie-page" style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className="overlay">
        <div className="content">
          {posterUrl && (
            <div className="poster-container">
              <img src={posterUrl} alt={`${movie.title} Poster`} className="poster" />
            </div>
          )}

          <div className="movie-info">
            <h1 className="title">{movie.title}</h1>
            <RatingComponent movieId={Number(movieId)} userId={userId} />
            <p className="overview">{movie.overview}</p>
            <div className="details">
              <p><strong>Release Date:</strong> {formattedDate}</p>
              <p><strong>Popularity:</strong> {movie.popularity}</p>
              <p><strong>Rating:</strong> {movie.voteAverage} ({movie.voteCount} votes)</p>
              <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
            </div>
          </div>

          <MovieRecommendations 
            movieTitle={movie.title} 
            movieId={Number(movieId)} 
            userId={userId} 
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;