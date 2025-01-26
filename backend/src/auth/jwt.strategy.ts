import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do header Authorization
      ignoreExpiration: false, // Rejeita tokens expirados
      secretOrKey: process.env.JWT_SECRET, // Pega a chave secreta do .env
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }; // Retorna dados do usuário
  }
}
