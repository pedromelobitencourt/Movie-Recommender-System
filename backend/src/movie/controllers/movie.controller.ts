import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './../services/movie.service';

@Controller('movies') // Define o prefixo da rota (ex.: /movies)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  /**
   * Endpoint para obter todos os filmes (com paginação)
   * Rota: GET /movies
   */
  @Get()
  async getAllMovies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.movieService.getAllMovies(page, limit);
  }

  /**
   * Endpoint para obter um filme por ID
   * Rota: GET /movies/:id
   */
  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return this.movieService.getMovieById(id);
  }

  /**
   * Endpoint para buscar filmes por título
   * Rota: GET /movies/search?query=<title>
   */
  @Get('/search')
  async searchMovies(@Query('query') query: string) {
    return this.movieService.searchMovies(query);
  }

  /**
   * Endpoint para buscar filmes por gênero
   * Rota: GET /movies/genre?genre=<genreId>
   */
  @Get('/genre')
  async getMoviesByGenre(@Query('genre') genre: string) {
    return this.movieService.getMoviesByGenre(genre);
  }
}
