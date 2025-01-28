import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInteraction } from '../entities/user-interaction.entity';

@Injectable()
export class UserInteractionService {
  constructor(
    @InjectRepository(UserInteraction)
    private readonly interactionRepository: Repository<UserInteraction>,
  ) {}

  // Salva um clique no filme
  async registerClick(
    userId: string,
    movieId: string,
  ): Promise<UserInteraction> {
    const interaction = this.interactionRepository.create({
      userId,
      movieId,
      clickedAt: new Date(),
    });
    return this.interactionRepository.save(interaction);
  }

  // Salva o tempo assistido
  async registerWatchTime(
    userId: string,
    movieId: string,
    watchTime: number,
  ): Promise<UserInteraction> {
    const interaction = this.interactionRepository.create({
      userId,
      movieId,
      watchTime,
    });
    return this.interactionRepository.save(interaction);
  }
}
