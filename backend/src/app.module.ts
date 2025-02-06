import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis globais na aplicação
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT, 10),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      autoLoadEntities: true,
      synchronize: false, // Em produção, considere usar migrations em vez de synchronize
    }),
    UserModule,
    AuthModule,
    MovieModule,
    RatingModule,
  ],
})
export class AppModule {}
