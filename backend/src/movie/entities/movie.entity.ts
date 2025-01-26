import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tmdbId: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  overview: string;

  @Column()
  releaseDate: string;

  @Column('float')
  popularity: number;

  @Column('float')
  voteAverage: number;

  @Column()
  voteCount: number;

  @Column()
  posterPath: string;

  @Column({ type: 'simple-array' })
  genres: string[]; // Certifique-se de que este campo está definido corretamente
}
