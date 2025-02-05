import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { RatingService } from './services/rating.service';
import { RatingController } from './controllers/rating.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  providers: [RatingService],
  controllers: [RatingController],
  exports: [RatingService],
})
export class RatingModule {}
