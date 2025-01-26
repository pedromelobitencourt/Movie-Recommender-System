import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  private readonly apiKey = process.env.TMDB_API_KEY;
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  /**
   * Busca filmes populares de múltiplas páginas da API TMDB e salva no banco de dados.
   */
  async fetchAndSavePopularMovies(pages: number = 10): Promise<string> {
    try {
      console.log(
        `Buscando filmes populares da API TMDB (${pages} páginas)...`,
      );

      for (let page = 1; page <= pages; page++) {
        const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}`;
        console.log(`Buscando página ${page}...`);
        const response = await lastValueFrom(this.httpService.get(url));

        const movies = response.data.results;

        for (const movie of movies) {
          const existingMovie = await this.movieRepository.findOne({
            where: { tmdbId: movie.id },
          });

          const movieProperties = {
            tmdbId: movie.id,
            title: movie.title,
            overview: movie.overview,
            releaseDate: movie.release_date,
            popularity: movie.popularity,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            posterPath: movie.poster_path,
            backdropPath: movie.backdrop_path,
            genres: movie.genre_ids.map((id: number) => id.toString()), // Convertendo IDs de gêneros para strings
          };

          if (!existingMovie) {
            const newMovie = this.movieRepository.create(movieProperties);

            await this.movieRepository.save(newMovie);
          }
        }
      }

      return 'Filmes populares salvos com sucesso!';
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro ao buscar filmes da API TMDB',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
