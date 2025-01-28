import { Controller, Post, Body } from '@nestjs/common';
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
}
