import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer'; // Import the Transform decorator from class-transformer module

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
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
