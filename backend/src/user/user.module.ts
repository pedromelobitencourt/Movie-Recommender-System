import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registra a entidade User
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Exporte o serviço se outros módulos precisarem dele
})
export class UserModule {}
