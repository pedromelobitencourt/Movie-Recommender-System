import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { RatingService } from '../services/rating.service';
import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ratingService = app.get(RatingService);

  console.log(
    'Iniciando a população do banco de dados com ratings a partir do CSV...',
  );

  const csvPath = './src/rating/scripts/ratings.csv'; // Caminho do arquivo CSV

  try {
    // Lê o arquivo CSV
    const csvData = await readFile(csvPath, 'utf8');
    const records = parse(csvData, { columns: true }); // Converte CSV para objetos JSON

    for (const record of records) {
      const userId = parseInt(record.userId, 10); // Coluna `userId` do CSV
      const movieId = parseInt(record.movieId, 10); // Coluna `movieId` do CSV
      const rating = parseFloat(record.rating); // Coluna `rating` do CSV

      // Popula o banco de dados com os ratings
      try {
        await ratingService.addOrUpdateRating(userId, movieId, rating);
        console.log(
          `Rating adicionado: UserID=${userId}, MovieID=${movieId}, Rating=${rating}`,
        );
      } catch (error) {
        console.error(
          `Erro ao processar o rating UserID=${userId}, MovieID=${movieId}:`,
          error.message,
        );
      }
    }

    console.log('Banco de dados populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular ratings:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
