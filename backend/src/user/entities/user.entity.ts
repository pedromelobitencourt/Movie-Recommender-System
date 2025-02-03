import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Indica que esta classe é uma entidade do banco de dados
export class User {
  @PrimaryGeneratedColumn('increment') // Chave primária gerada automaticamente
  id: string;

  @Column() // Nome do usuário
  name: string;

  @Column({ unique: true }) // E-mail do usuário (único)
  email: string;

  @Column() // Senha do usuário
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Data de criação
  createdAt: Date;
}
