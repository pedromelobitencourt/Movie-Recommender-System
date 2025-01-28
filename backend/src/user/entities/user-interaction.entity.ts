import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Movie } from '../../movie/entities/movie.entity';

@Entity()
@Unique(['userId', 'movieId']) // Restrição única para evitar duplicatas
export class UserInteraction {
  @PrimaryGeneratedColumn('uuid') // ID único para cada interação
  id: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' }) // Relaciona com o usuário
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string; // ID do usuário

  @ManyToOne(() => Movie, (movie) => movie.id, { onDelete: 'CASCADE' }) // Relaciona com o filme
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column()
  movieId: string; // ID do filme

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  clickedAt: Date; // Momento do clique

  @Column({ type: 'int', nullable: true })
  watchTime: number; // Tempo assistido em segundos (pode ser nulo se for só um clique)
}
