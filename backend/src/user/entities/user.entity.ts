import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Indica que esta classe é uma entidade do banco de dados
export class User {
  @PrimaryGeneratedColumn('uuid') // Chave primária gerada automaticamente
  id: string;

  @Column() // Nome do usuário
  name: string;

  @Column({ unique: true }) // E-mail do usuário (único)
  email: string;

  @Column() // Senha do usuário
  password: string;

  @Column({ nullable: true }) // Idade
  age: number;

  @Column({ nullable: true }) // Gênero
  gender: string;

  @Column({ nullable: true }) // Localização
  location: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Data de criação
  createdAt: Date;

  @Column('text', { array: true, nullable: true }) // Gêneros favoritos do usuário
  preferredGenres: string[];

  @Column({ default: false }) // Usuário aceita recomendações personalizadas?
  acceptsRecommendations: boolean;

  @Column({ nullable: true }) // Cluster ao qual o usuário pertence (se houver clustering de usuários)
  clusterId: number;

  @Column('float', { array: true, nullable: true }) // Vetores de características do usuário para recomendação
  featureVector: number[];

  @Column({ nullable: true }) // Último login do usuário
  lastLogin: Date;

  @Column({ nullable: true }) // IP do último acesso
  lastIp: string;

  @Column({ default: false }) // Conta está ativa?
  isActive: boolean;

  @Column({ default: false }) // Usuário tem acesso como administrador?
  isAdmin: boolean;
}
