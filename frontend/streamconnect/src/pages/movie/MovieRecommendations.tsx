import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MovieRecommendations.css';

interface Movie {
  id: number;
  title: string;
  posterPath: string;
}

interface Props {
  movieTitle: string;
  movieId: number;
}

const MovieRecommendations: React.FC<Props> = ({ movieTitle, movieId }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8111/clustering/recommend',
          {
            title: movieTitle,
            num_recommendations: 30,
          },
          { signal: controller.signal }
        );

        console.log("******************** FILMES ****************");
        console.log(response.data);

        // Filtra IDs duplicados imediatamente da resposta da API
        const uniqueMovies = response.data.filter(
          (movie: any, index: number, self: any[]) =>
            index === self.findIndex((m) => m.movie_id === movie.movie_id)
        );

        const detailedMovies = await Promise.all(
          uniqueMovies.map(async (movie: any) => {
            try {
              const movieSearchResponse = await axios.get(
                `http://localhost:3000/movies/search?query=${encodeURIComponent(movie.title)}`,
                { signal: controller.signal }
              );
              
              // Verifica se a resposta da pesquisa é válida
              if (movieSearchResponse.data.length === 0) return null;

              const movieData = movieSearchResponse.data[0];
              return {
                id: movieData.id,
                title: movieData.title,
                posterPath: movieData.posterPath
                  ? `https://image.tmdb.org/t/p/w500${movieData.posterPath}`
                  : 'https://via.placeholder.com/200x300?text=No+Image',
              };
            } catch (error) {
              if (!axios.isCancel(error)) {
                console.error(`Erro ao carregar informações do filme "${movie.title}"`, error);
              }
              return null;
            }
          })
        );

        // Filtra nulos e duplicados novamente
        const filteredMovies = detailedMovies
          .filter((movie): movie is Movie => movie !== null)
          .filter((movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
          );

        setRecommendedMovies(filteredMovies);
        setIsLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Erro ao buscar recomendações:', error);
          setIsLoading(false);
        }
      }
    };

    fetchRecommendations();

    return () => {
      controller.abort();
    };
  }, [movieTitle]);

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
    // Remove o window.location.reload()
  };

  return (
    <div className="recommendations-container">
      <h2>Filmes parecidos com este</h2>
      {isLoading ? (
        <div className="loading">Carregando recomendações...</div>
      ) : (
        <div className="recommendations-grid">
          {recommendedMovies.map((movie) => (
            <div
              key={movie.id}
              className="recommendation-card"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img src={movie.posterPath} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieRecommendations;