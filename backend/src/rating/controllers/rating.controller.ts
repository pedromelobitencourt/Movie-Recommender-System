import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RatingService } from '../services/rating.service';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async addRating(
    @Body('userId') userId: number,
    @Body('movieId') movieId: number,
    @Body('rating') ratingValue: number,
  ) {
    return this.ratingService.addOrUpdateRating(userId, movieId, ratingValue);
  }

  @Get()
  async getUserRatingForMovie(
    @Query('userId') userId: number,
    @Query('movieId') movieId: number,
  ) {
    return this.ratingService.getUserRatingForMovie(userId, movieId);
  }
}
