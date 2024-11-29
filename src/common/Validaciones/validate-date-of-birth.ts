import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'ValidateDateOfBirth', async: false })
export class ValidateDateOfBirth implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const birthDate = new Date(value);
    const today = new Date();

    // Verificar que la fecha de nacimiento no sea futura
    if (birthDate > today) {
      return false; // La fecha no es válida si es futura
    }

    // Calcular la edad
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    const day = today.getDate() - birthDate.getDate();

    // Ajustar la edad si el cumpleaños no ha ocurrido este año
    if (month < 0 || (month === 0 && day < 0)) {
      return age >= 18;
    }

    return age >= 18;
  }

  defaultMessage(args: ValidationArguments) {
    return 'La persona debe ser mayor de 18 años.';
  }
}
