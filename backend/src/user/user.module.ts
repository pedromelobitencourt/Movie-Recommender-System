import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserInteraction } from './entities/user-interaction.entity';
import { UserInteractionService } from './services/user-interaction.service';
import { UserInteractionController } from './controllers/user-interaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserInteraction]), // Registra a entidade User
  ],
  providers: [UserService, UserInteractionService],
  controllers: [UserController, UserInteractionController],
  exports: [UserService], // Exporte o serviço se outros módulos precisarem dele
})
export class UserModule {}
