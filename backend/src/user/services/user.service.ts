import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Repositório para interagir com a tabela de usuários
  ) {}

  /**
   * Cria um novo usuário
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    //const salt = await bcrypt.genSalt();
    //const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: createUserDto.password, //: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  /**
   * Retorna todos os usuários
   */
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find(); // Busca todos os usuários no banco
  }

  /**
   * Retorna um usuário pelo ID
   */
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  /**
   * Busca um usuário pelo e-mail
   */
  async getUserByEmail(email: string): Promise<User> {
    // Busca no banco de dados pelo campo e-mail
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `Usuário com o e-mail ${email} não foi encontrado`,
      );
    }
    return user;
  }

  /**
   * Atualiza um usuário pelo ID
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id); // Garante que o usuário existe
    Object.assign(user, updateUserDto); // Atualiza os campos do usuário
    return this.userRepository.save(user); // Salva as alterações no banco
  }

  /**
   * Remove um usuário pelo ID
   */
  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id); // Remove o usuário do banco
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }
}
