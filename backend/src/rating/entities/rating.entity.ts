import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Movie } from '../../movie/entities/movie.entity';
import { IsNumber, Min, Max } from 'class-validator';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.ratings, { onDelete: 'CASCADE' })
  movie: Movie;

  @Column({ type: 'float' })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  // Hook para garantir que o valor esteja entre 0 e 5
  @BeforeInsert()
  @BeforeUpdate()
  validateRatingRange() {
    if (this.rating < 0 || this.rating > 5) {
      throw new Error('The rating value must be between 0 and 5.');
    }
  }
}
