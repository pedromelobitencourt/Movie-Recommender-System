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
  movieId: number;
  userId: number;
}

const RatingComponent: React.FC<{ movieId: number; userId: number }> = ({ movieId, userId }) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ratings', {
          params: { userId: 28, movieId: 371 },
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
        userId,
        movieId,
        rating,
      });
      setUserRating(rating);
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 10; i++) {
      const ratingValue = (i + 1) * 0.5;
      stars.push(
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
    }
    return stars;
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

const MovieRecommendations: React.FC<Props> = ({ movieTitle, movieId, userId }) => {
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
      <RatingComponent movieId={movieId} userId={userId} />

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
