import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid') // ID único para cada filme
  id: string;

  @Column()
  title: string; // Título do filme

  @Column()
  genre: string; // Gênero do filme

  @Column()
  director: string; // Diretor

  @Column()
  releaseYear: number; // Ano de lançamento

  @Column({ type: 'text', nullable: true })
  description?: string; // Descrição do filme
}
