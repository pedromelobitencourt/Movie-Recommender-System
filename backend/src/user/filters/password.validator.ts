import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PasswordStrengthConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string) {
    // Regras: pelo menos 6 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  }

  defaultMessage() {
    return 'A senha deve ter pelo menos 6 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial';
  }
}

export function PasswordStrength(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordStrengthConstraint,
    });
  };
}
