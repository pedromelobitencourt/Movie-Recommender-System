import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PasswordStrength } from '../filters/password.validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @PasswordStrength({
    message:
      'A senha deve ter pelo menos 6 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial',
  })
  password: string;

  @IsOptional()
  @IsString()
  preferredLanguage?: string; // Idioma preferido do usuário

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredGenres?: string[]; // Lista de gêneros favoritos

  @IsOptional()
  @IsString()
  location?: string; // Localização do usuário

  @IsOptional()
  @IsString()
  gender?: string; // Gênero do usuário

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === undefined ? true : value))
  acceptsRecommendations?: boolean; // Se aceita recomendações personalizadas
}
