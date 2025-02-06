import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rating } from '../../rating/entities/rating.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  tmdbid: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  overview: string;

  @Column()
  releasedate: string;

  @Column('float')
  popularity: number;

  @Column('float')
  voteaverage: number;

  @Column()
  votecount: number;

  @Column({ nullable: true })
  posterpath: string;

  @Column({ nullable: true })
  backdroppath: string;

  @Column({ type: 'simple-array' })
  genres: string[];

  // Relacionamento com a entidade Rating
  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];
}
