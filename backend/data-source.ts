import { DataSource } from 'typeorm';
import { User } from './src/user/entities/user.entity';
import { Movie } from './src/movie/entities/movie.entity';
import { UserInteraction } from './src/user/entities/user-interaction.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin', // Substitua pelo seu usuário
  password: 'password', // Substitua pela sua senha
  database: 'movie_db', // Substitua pelo nome do seu banco
  entities: [User, Movie, UserInteraction],
  migrations: ['dist/migrations/*.js'],
  synchronize: false, // Certifique-se de desativar se estiver usando migrações
});
