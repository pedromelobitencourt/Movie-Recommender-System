import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo do banco de dados
      host: 'localhost', // Host onde o PostgreSQL está rodando
      port: 5432, // Porta padrão do PostgreSQL
      username: 'admin', // Usuário criado
      password: 'password', // Senha criada
      database: 'movie_db', // Nome do banco de dados
      autoLoadEntities: true, // Carrega automaticamente as entidades
      synchronize: true, // Sincroniza o schema do banco com as entidades (não recomendado em produção)
    }),
    UserModule,
  ],
})
export class AppModule {}
