import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserExceptionFilter } from '../filters/user-query-exception.filter';

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
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  /**
   * Busca um usuário pelo ID
   * Rota: GET /users/:id
   */
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  /**
   * Atualiza informações de um usuário
   * Rota: PUT /users/:id
   */
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
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
