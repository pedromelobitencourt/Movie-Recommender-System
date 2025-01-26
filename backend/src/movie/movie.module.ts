import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importe o HttpModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MovieService } from './services/movie.service';
import { TmdbService } from './services/tmdb.service';
import { MovieController } from './controllers/movie.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]), // Registra a entidade Movie
    HttpModule, // Adicione o HttpModule aqui
  ],
  providers: [MovieService, TmdbService],
  controllers: [MovieController],
  exports: [TmdbService],
})
export class MovieModule {}
