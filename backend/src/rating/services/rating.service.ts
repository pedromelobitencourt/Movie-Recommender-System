import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';
import { User } from '../../user/entities/user.entity';
import { Movie } from '../../movie/entities/movie.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  async addOrUpdateRating(
    userId: number,
    movieId: number,
    ratingValue: number,
  ): Promise<Rating> {
    // Verifica se já existe um rating para o usuário e o filme
    let rating = await this.ratingRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
      relations: ['user', 'movie'], // Garante que as relações sejam carregadas
    });

    if (rating) {
      // Atualiza o valor do rating existente
      rating.rating = ratingValue;
    } else {
      // Cria um novo rating
      rating = this.ratingRepository.create({
        user: { id: userId } as User,
        movie: { id: movieId } as Movie,
        rating: ratingValue,
      });
    }

    return this.ratingRepository.save(rating); // Salva ou atualiza no banco
  }

  async getUserRatingForMovie(
    userId: number,
    movieId: number,
  ): Promise<Rating | null> {
    return this.ratingRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
      relations: ['user', 'movie'],
    });
  }
}
