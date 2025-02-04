import { IsString, IsEmail } from 'class-validator';
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
}
