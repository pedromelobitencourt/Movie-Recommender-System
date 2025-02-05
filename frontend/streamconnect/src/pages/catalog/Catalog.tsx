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

  useEffect(() => {
    // Fetch recommended movies for "Recomendados para Você"
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8111/prediction/recommend', {
          user_id: userId,
          num_recommendations: 45,
        });

        // Map over the recommended movie IDs and fetch full details for each
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
              console.error(`Erro ao buscar detalhes do filme com ID ${movie.id}:`, error);
              return null; // Retorna null se algum filme falhar
            }
          })
        );

        // Filtra nulos
        const filteredMovies = detailedMovies.filter(
          (movie): movie is Movie => movie !== null
        );

        setRecommendedMovies(filteredMovies);
        setIsLoadingRecommendations(false);
      } catch (error) {
        console.error('Erro ao carregar recomendações:', error);
        setIsLoadingRecommendations(false);
      }
    };

    if (userId) fetchRecommendedMovies();
  }, [userId]);

  useEffect(() => {
    // Fetch all movies for "Filmes no Catálogo"
    const fetchCatalogMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/movies', {
          params: {
            page: 1,
            limit: 4796
          }
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
        console.error('Erro ao carregar filmes do catálogo:', error);
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

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
    // Remove o window.location.reload()
  };

  return (
    <div className="catalog-container">
      <section className="catalog-section">
        <h2>Recomendados para Você</h2>
        {isLoadingRecommendations ? (
          <div className="loading">Carregando recomendações...</div>
        ) : (
          <div className="movies-grid">{renderMovies(recommendedMovies)}</div>
        )}
      </section>

      <section className="catalog-section">
        <h2>Filmes no Catálogo</h2>
        {isLoadingCatalog ? (
          <div className="loading">Carregando filmes do catálogo...</div>
        ) : (
          <div className="movies-grid">{renderMovies(catalogMovies)}</div>
        )}
      </section>
    </div>
  );
};

export default Catalog;
