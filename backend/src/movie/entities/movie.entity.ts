import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @Column({ nullable: true })
  posterPath: string;

  @Column({ nullable: true })
  backdropPath: string;

  @Column({ type: 'simple-array' })
  genres: string[]; // Certifique-se de que este campo está definido corretamente
}
