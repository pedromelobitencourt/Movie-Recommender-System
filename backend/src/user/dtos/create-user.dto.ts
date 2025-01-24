import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsArray,
} from 'class-validator';

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
  preferredLanguage?: string; // Idioma preferido do usuário (opcional)

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferredGenres?: string[]; // Lista de gêneros favoritos (opcional)

  @IsOptional()
  @IsString()
  location?: string; // Localização do usuário (opcional)

  @IsOptional()
  @IsString()
  gender?: string; // Gênero do usuário (opcional)

  @IsOptional()
  acceptsRecommendations?: boolean; // Se aceita recomendações personalizadas (opcional)
}
