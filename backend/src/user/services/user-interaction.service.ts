import { Between, Repository } from 'typeorm';
import { UserInteraction } from '../entities/user-interaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserInteractionService {
  constructor(
    @InjectRepository(UserInteraction)
    private readonly interactionRepository: Repository<UserInteraction>,
  ) {}

  // Registra ou atualiza um clique no filme
  async registerClick(
    userId: string,
    movieId: string,
  ): Promise<UserInteraction> {
    // Verifica se já existe interação para o mesmo usuário e filme
    let interaction = await this.interactionRepository.findOne({
      where: { userId, movieId },
    });

    if (interaction) {
      // Se já existir, apenas atualiza o campo 'clickedAt'
      console.log('Existe');
      interaction.clickedAt = new Date();
    } else {
      // Se não existir, cria um novo registro
      interaction = this.interactionRepository.create({
        userId,
        movieId,
        clickedAt: new Date(),
      });
    }

    return this.interactionRepository.save(interaction);
  }

  async registerWatchTime(
    userId: string,
    movieId: string,
    watchTime: number,
  ): Promise<UserInteraction> {
    // Verifica se já existe interação para o mesmo usuário e filme
    let interaction = await this.interactionRepository.findOne({
      where: { userId, movieId },
    });

    console.log('oi');
    if (interaction) {
      console.log('exxiste');
      // Atualiza o tempo assistido no registro existente
      interaction.watchTime += watchTime;
    } else {
      // Se não existir, cria um novo registro com tempo assistido
      interaction = this.interactionRepository.create({
        userId,
        movieId,
        watchTime,
        clickedAt: new Date(), // Opcional: atualiza o momento do clique junto
      });
    }

    return this.interactionRepository.save(interaction);
  }

  async getTotalWatchTimeByMovie(
    movieId: string,
  ): Promise<{ movieId: string; title: string; totalWatchTime: number }> {
    const result = await this.interactionRepository
      .createQueryBuilder('interaction')
      .select('interaction.movieId', 'movieId')
      .addSelect('movie.title', 'title')
      .addSelect('SUM(interaction.watchTime)', 'totalWatchTime') // Sem aspas no alias
      .innerJoin('interaction.movie', 'movie') // Join com a tabela de filmes
      .where('interaction.movieId = :movieId', { movieId })
      .andWhere('interaction.watchTime IS NOT NULL') // Apenas interações com watchTime
      .groupBy('interaction.movieId, movie.title')
      .getRawOne();

    return result || { movieId, title: 'Unknown', totalWatchTime: 0 }; // Retorna 0 se não houver dados
  }

  async getTopMoviesByUser(
    userId: string,
  ): Promise<{ movieId: string; title: string; totalWatchTime: number }[]> {
    return this.interactionRepository
      .createQueryBuilder('interaction')
      .select('interaction.movieId', 'movieId')
      .addSelect('movie.title', 'title')
      .addSelect('SUM(interaction.watchTime)', 'totalWatchTime')
      .innerJoin('interaction.movie', 'movie')
      .where('interaction.userId = :userId', { userId })
      .andWhere('interaction.watchTime IS NOT NULL')
      .groupBy('interaction.movieId, movie.title')
      .orderBy('SUM(interaction.watchTime)', 'DESC')
      .limit(10)
      .getRawMany();
  }

  async getAllInteractions(): Promise<UserInteraction[]> {
    return this.interactionRepository.find();
  }

  async getInteractionsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<UserInteraction[]> {
    return this.interactionRepository.find({
      where: {
        clickedAt: Between(new Date(startDate), new Date(endDate)),
      },
    });
  }

  async getUserStats(
    userId: string,
  ): Promise<{ totalClicks: number; totalWatchTime: number }> {
    const totalClicks = await this.interactionRepository.count({
      where: { userId },
    });
    const totalWatchTime = await this.interactionRepository
      .createQueryBuilder('interaction')
      .select('SUM(interaction.watchTime)', 'total')
      .where('interaction.userId = :userId', { userId })
      .getRawOne();

    return {
      totalClicks,
      totalWatchTime: totalWatchTime?.total || 0,
    };
  }

  async getStatistics(filters: {
    userId?: string;
    movieId?: string;
    genre?: string;
    dateRange?: string;
  }): Promise<any> {
    const queryBuilder = this.interactionRepository
      .createQueryBuilder('interaction')
      .select('interaction.movieId', 'movieId')
      .addSelect('movie.title', 'title')
      .addSelect('COUNT(*)', 'totalInteractions')
      .addSelect('SUM(interaction.watchTime)', 'totalWatchTime')
      .innerJoin('interaction.movie', 'movie');

    // Aplica os filtros conforme necessário
    if (filters.userId) {
      queryBuilder.where('interaction.userId = :userId', {
        userId: filters.userId,
      });
    }
    if (filters.movieId) {
      queryBuilder.andWhere('interaction.movieId = :movieId', {
        movieId: filters.movieId,
      });
    }
    if (filters.genre) {
      queryBuilder.andWhere('movie.genres LIKE :genre', {
        genre: `%${filters.genre}%`,
      });
    }
    if (filters.dateRange) {
      const [startDate, endDate] = filters.dateRange.split(',');
      queryBuilder.andWhere(
        'interaction.clickedAt BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    queryBuilder.groupBy('interaction.movieId, movie.title');
    const stats = await queryBuilder.getRawMany();

    return stats;
  }
}
