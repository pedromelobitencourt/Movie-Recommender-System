import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserExceptionFilter } from '../filters/user-query-exception.filter';
import { AuthGuard } from '@nestjs/passport';

@Controller('users') // Define o prefixo da rota (ex.: /users)
@UseFilters(UserExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {} // Injeta o serviço de usuários

  /**
   * Cria um novo usuário
   * Rota: POST /users
   */
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Busca todos os usuários
   * Rota: GET /users
   */
  @Get()
  //@UseGuards(AuthGuard('jwt')) // Protege a rota com o AuthGuard do Nest
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  /**
   * Busca um usuário pelo ID
   * Rota: GET /users/:id
   */
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  /**
   * Busca um usuário pelo e-mail
   * Rota: GET /users/email/:email
   */
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  /**
   * Atualiza informações de um usuário
   * Rota: PUT /users/:id
   */
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  /**
   * Remove um usuário pelo ID
   * Rota: DELETE /users/:id
   */
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
