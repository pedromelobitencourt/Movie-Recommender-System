import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import UserSeederService from './services/user-seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registra a entidade User
  ],
  providers: [UserService, UserSeederService],
  controllers: [UserController],
  exports: [UserService], // Exporte o serviço se outros módulos precisarem dele
})
export class UserModule {}
