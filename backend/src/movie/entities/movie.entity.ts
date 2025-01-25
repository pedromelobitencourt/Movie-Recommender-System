import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid') // ID único para cada filme
  id: string;

  @Column({ unique: true })
  tmdbId: number; // ID do filme na API TMDB

  @Column()
  title: string; // Título do filme

  @Column({ type: 'text' })
  description: string; // Descrição do filme

  @Column()
  releaseDate: string; // Data de lançamento do filme

  @Column('float')
  popularity: number; // Popularidade do filme

  @Column('float')
  voteAverage: number; // Média de votos

  @Column()
  voteCount: number; // Total de votos

  @Column()
  posterPath: string; // Caminho para o pôster do filme

  @Column({ type: 'simple-array' })
  genres: string[]; // Lista de gêneros
}
