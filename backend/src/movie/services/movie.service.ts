import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import * as tfidf from 'tf-idf-similarity';

@Injectable()
export class MovieService {
  private tfidfMatrix: tfidf.Tfidf[] = []; // Matriz TF-IDF
  private movieTitles: string[] = []; // Lista de títulos dos filmes

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>, // Repositório do banco de dados
  ) {}

  /**
   * Busca todos os filmes
   */
  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  /**
   * Busca um filme pelo ID
   */
  async getMovieById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado`);
    }
    return movie;
  }

  /**
   * Inicializa a matriz TF-IDF
   */
  async initializeSimilarityMatrix() {
    const movies = await this.movieRepository.find();
    const descriptions = movies.map((movie) => movie.description);
    const tfidfVectorizer = new tfidf.TfidfVectorizer();
    this.tfidfMatrix = tfidfVectorizer.fit(descriptions);
    this.movieTitles = movies.map((movie) => movie.title);
  }

  /**
   * Retorna filmes similares a um título
   */
  async getSimilarMovies(movieTitle: string, topN = 3): Promise<Movie[]> {
    if (!this.tfidfMatrix.length) {
      await this.initializeSimilarityMatrix();
    }

    const movieIndex = this.movieTitles.indexOf(movieTitle);
    if (movieIndex === -1) {
      throw new NotFoundException(
        `Filme com título "${movieTitle}" não encontrado`,
      );
    }

    const scores = tfidf.calculateSimilarity(this.tfidfMatrix, movieIndex);
    const rankedMovies = scores
      .map((score, index) => ({ index, score }))
      .sort((a, b) => b.score - a.score);

    const similarMovieIndices = rankedMovies
      .slice(1, topN + 1)
      .map((m) => m.index);
    return this.movieRepository.findByIds(
      similarMovieIndices.map((i) => movies[i].id),
    );
  }
}
