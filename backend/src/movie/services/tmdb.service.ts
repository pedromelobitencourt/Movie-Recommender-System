import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './../entities/movie.entity';
import { HttpService } from '@nestjs/axios';
import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  private readonly apiKey = process.env.TMDB_API_ACCESS_TOKEN; // Certifique-se de que essa variável de ambiente está configurada
  private readonly baseUrl = 'https://api.themoviedb.org/3/movie';

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly httpService: HttpService,
  ) {}

  async populateMoviesFromCsv(csvPath: string): Promise<string> {
    const errors: { id: string; title: string }[] = []; // Lista para armazenar os filmes com erro

    try {
      // Lê o arquivo CSV
      const csvData = await readFile(csvPath, 'utf8');
      const records = parse(csvData, { columns: true }); // Converte CSV para objetos JSON

      for (const record of records) {
        const tmdbId = record.id; // Coluna `id` do CSV
        const title = record.title; // Coluna `title` do CSV

        try {
          const existingMovie = await this.movieRepository.findOne({
            where: { tmdbid: Number(tmdbId) },
          });

          if (!existingMovie) {
            // Faz a requisição à API do TMDB
            const url = `${this.baseUrl}/${tmdbId}`;
            const response = await lastValueFrom(
              this.httpService.get(url, {
                headers: { Authorization: `Bearer ${this.apiKey}` },
              }),
            );

            const movieData = response.data;

            // Mapeia os dados retornados para a entidade
            const newMovie = this.movieRepository.create({
              tmdbid: movieData.id,
              title: movieData.title,
              overview: movieData.overview,
              releasedate: movieData.release_date,
              popularity: movieData.popularity,
              voteaverage: movieData.vote_average,
              votecount: movieData.vote_count,
              posterpath: movieData.poster_path,
              backdroppath: movieData.backdrop_path,
              genres: movieData.genres.map(
                (genre: { name: string }) => genre.name,
              ), // Transforma para array de nomes de gêneros
            });

            // Salva o filme no banco de dados
            await this.movieRepository.save(newMovie);
          }
        } catch (error) {
          // Adiciona o filme à lista de erros
          console.error(
            `Erro ao processar o filme "${title}" (ID: ${tmdbId}):`,
            error.message,
          );
          errors.push({ id: tmdbId, title });
        }
      }

      // Após o loop, imprime o tamanho da lista e os filmes que deram erro
      console.log(`Número de filmes com erro: ${errors.length}`);
      errors.forEach((error) =>
        console.log(`Erro - ID: ${error.id}, Título: ${error.title}`),
      );

      return 'Processamento de filmes concluído!';
    } catch (error) {
      console.error('Erro ao popular filmes:', error);
      throw new HttpException(
        'Erro ao popular filmes a partir do CSV',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
