import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>, // Repositório para interagir com a tabela de filmes
  ) {}

  /**
   * Busca todos os filmes
   */
  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find(); // Retorna todos os filmes
  }

  /**
   * Busca filmes por gênero
   */
  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    return this.movieRepository.find({ where: { genre } }); // Busca filmes por gênero
  }

  /**
   * Busca um filme pelo ID
   */
  async getMovieById(id: string): Promise<Movie> {
    return this.movieRepository.findOne({ where: { id } });
  }
}
