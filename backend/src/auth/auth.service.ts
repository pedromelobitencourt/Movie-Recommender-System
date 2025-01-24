import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // Usa o serviço User para buscar usuários
    private readonly jwtService: JwtService, // Usa o JwtService para gerar tokens
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Busca o usuário pelo e-mail
    const user = await this.userService.getUserByEmail(email);
    if (user && user.password === password) {
      // Compare a senha (adapte para senhas criptografadas)
      const { password, ...result } = user;
      return result; // Retorna o usuário sem a senha
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id }; // Payload do token JWT
    return {
      access_token: this.jwtService.sign(payload), // Gera o token JWT
    };
  }
}
