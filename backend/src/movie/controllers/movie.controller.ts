import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './../services/movie.service';

@Controller('movies') // Define o prefixo da rota
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  /**
   * Retorna todos os filmes
   * Rota: GET /movies
   */
  @Get()
  async getAllMovies() {
    return this.movieService.getAllMovies();
  }

  /**
   * Retorna filmes por gênero
   * Rota: GET /movies?genre=genreName
   */
  @Get()
  async getMoviesByGenre(@Query('genre') genre: string) {
    return this.movieService.getMoviesByGenre(genre);
  }

  /**
   * Retorna um filme pelo ID
   * Rota: GET /movies/:id
   */
  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return this.movieService.getMovieById(id);
  }
}
