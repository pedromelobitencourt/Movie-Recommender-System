import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { UserInteractionService } from '../services/user-interaction.service';

@Controller('interactions') // Define o prefixo das rotas
export class UserInteractionController {
  constructor(private readonly interactionService: UserInteractionService) {}

  /**
   * Rota para registrar cliques em filmes
   * Rota: POST /interactions/click
   */
  @Post('/click')
  async registerClick(
    @Body('userId') userId: string,
    @Body('movieId') movieId: string,
  ) {
    return this.interactionService.registerClick(userId, movieId);
  }

  /**
   * Rota para registrar o tempo assistido
   * Rota: POST /interactions/watch-time
   */
  @Post('/watch-time')
  async registerWatchTime(
    @Body('userId') userId: string,
    @Body('movieId') movieId: string,
    @Body('watchTime') watchTime: number,
  ) {
    return this.interactionService.registerWatchTime(
      userId,
      movieId,
      watchTime,
    );
  }

  /**
   * Endpoint para obter os filmes mais assistidos por um usuário
   * Rota: GET /interactions/user/:userId/top-movies
   */
  @Get('/user/:userId/top-movies')
  async getTopMoviesByUser(@Param('userId') userId: string) {
    return this.interactionService.getTopMoviesByUser(userId);
  }

  /**
   * Endpoint para obter o tempo total assistido de um filme
   * Rota: GET /interactions/movie/:movieId/watch-time
   */
  @Get('movie/:movieId/watch-time')
  async getTotalWatchTimeByMovie(@Param('movieId') movieId: string) {
    return this.interactionService.getTotalWatchTimeByMovie(movieId);
  }

  /**
   * Endpoint para obter todas as interações
   * Rota: GET /interactions
   */
  @Get()
  async getAllInteractions() {
    return this.interactionService.getAllInteractions();
  }

  /**
   * Endpoint para obter interações por intervalo de tempo
   * Rota: GET /interactions/date-range
   */
  @Get('/date-range')
  async getInteractionsByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.interactionService.getInteractionsByDateRange(
      startDate,
      endDate,
    );
  }

  /**
   * Endpoint para obter estatísticas de um usuário
   * Rota: GET /interactions/user/:userId/stats
   */
  @Get('/user/:userId/stats')
  async getUserStats(@Param('userId') userId: string) {
    return this.interactionService.getUserStats(userId);
  }

  /**
   * Endpoint para obter estatísticas gerais ou filtradas
   * Rota: GET /stats
   */
  @Get('/stats')
  async getStatistics(
    @Query('userId') userId?: string, // Opcional: Estatísticas para um usuário específico
    @Query('movieId') movieId?: string, // Opcional: Estatísticas para um filme específico
    @Query('genre') genre?: string, // Opcional: Estatísticas para um gênero
    @Query('dateRange') dateRange?: string, // Opcional: Intervalo de datas (ex.: "2025-01-01,2025-01-28")
  ) {
    return this.interactionService.getStatistics({
      userId,
      movieId,
      genre,
      dateRange,
    });
  }
}
