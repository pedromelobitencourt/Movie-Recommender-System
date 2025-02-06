import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Hooks/UseAuth';
import './Catalog.css';

interface Movie {
  id: number;
  title: string;
  posterPath: string;
}

const Catalog: React.FC = () => {
  const { userId } = useAuth();
  const [catalogMovies, setCatalogMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const navigate = useNavigate();

  // Skeleton loader array
  const skeletonItems = Array(6).fill(null);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8111/prediction/recommend', {
          user_id: userId,
          num_recommendations: 45,
        });

        const detailedMovies = await Promise.all(
          response.data.map(async (movie: { id: number; title: string }) => {
            try {
              const movieDetailsResponse = await axios.get(
                `http://localhost:3000/movies/by-tmdb-id/${movie.id}`
              );
              const movieDetails = movieDetailsResponse.data;

              return {
                id: movieDetails.id,
                title: movieDetails.title,
                posterPath: movieDetails.posterPath
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.posterPath}`
                  : 'https://via.placeholder.com/200x300?text=No+Image',
              };
            } catch (error) {
              console.error(`Error fetching movie details for ID ${movie.id}:`, error);
              return null;
            }
          })
        );

        const filteredMovies = detailedMovies.filter(
          (movie): movie is Movie => movie !== null
        );

        setRecommendedMovies(filteredMovies);
        setIsLoadingRecommendations(false);
      } catch (error) {
        console.error('Error loading recommendations:', error);
        setIsLoadingRecommendations(false);
      }
    };

    if (userId) fetchRecommendedMovies();
  }, [userId]);

  useEffect(() => {
    const fetchCatalogMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies', {
          params: { page: 1, limit: 4796 }
        });
        const movies = response.data.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          posterPath: movie.posterPath
            ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
            : 'https://via.placeholder.com/200x300?text=No+Image',
        }));
        setCatalogMovies(movies);
        setIsLoadingCatalog(false);
      } catch (error) {
        console.error('Error loading catalog movies:', error);
        setIsLoadingCatalog(false);
      }
    };

    fetchCatalogMovies();
  }, []);

  const renderMovies = (movies: Movie[]) => {
    return movies.map((movie) => (
      <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
        <img src={movie.posterPath} alt={movie.title} />
        <p>{movie.title}</p>
      </div>
    ));
  };

  const renderSkeletonLoader = () => {
    return skeletonItems.map((_, index) => (
      <div key={index} className="movie-card skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text-short"></div>
      </div>
    ));
  };

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="catalog-container">
      <section className="catalog-section">
        <h2>Recommended for You</h2>
        <div className="movies-grid">
          {isLoadingRecommendations ? renderSkeletonLoader() : renderMovies(recommendedMovies)}
        </div>
      </section>

      <section className="catalog-section">
        <h2>Catalog Movies</h2>
        <div className="movies-grid">
          {isLoadingCatalog ? renderSkeletonLoader() : renderMovies(catalogMovies)}
        </div>
      </section>
    </div>
  );
};

export default Catalog;