import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Movie } from './../entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  /**
   * Obtém todos os filmes com paginação
   */
  async getAllMovies(page: number, limit: number): Promise<Movie[]> {
    const skip = (page - 1) * limit;
    return this.movieRepository.find({
      skip,
      take: limit,
      order: { popularity: 'DESC' },
    });
  }

  /**
   * Obtém um filme pelo ID
   */
  async getMovieById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado`);
    }
    return movie;
  }

  /**
   * Obtém um filme pelo ID
   */
  async getMovieByTmdbId(tmdbid: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { tmdbid } });
    if (!movie) {
      throw new NotFoundException(`Filme com ID ${tmdbid} não encontrado`);
    }
    return movie;
  }

  /**
   * Busca filmes por título
   */
  async searchMovies(query: string): Promise<Movie[]> {
    return this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.title ILIKE :query', { query: `%${query}%` })
      .getMany();
  }

  /**
   * Busca filmes por gênero
   */
  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    return this.movieRepository.find({
      where: {
        genres: Like(`%${genre}%`),
      },
      order: { popularity: 'DESC' },
    });
  }
}
