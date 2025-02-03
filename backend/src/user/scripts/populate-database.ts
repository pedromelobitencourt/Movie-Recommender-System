import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UserSeederService } from '../services/user-seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userSeederService = app.get(UserSeederService);

  console.log('Iniciando a população do banco de dados com usuários...');

  try {
    await userSeederService.seedUsers();
    console.log('Banco de dados populado com sucesso!');
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
