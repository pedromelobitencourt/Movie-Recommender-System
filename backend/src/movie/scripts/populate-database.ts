import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { TmdbService } from './../services/tmdb.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tmdbService = app.get(TmdbService);

  console.log(
    'Iniciando a população do banco de dados com filmes populares...',
  );

  try {
    await tmdbService.fetchAndSavePopularMovies();
    console.log('Banco de dados populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
