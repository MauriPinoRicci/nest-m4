import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  Matches,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Name of user',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no debe estar vacío.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'the email of user',
    required: true,
  })
  @IsEmail(
    {},
    { message: 'El correo electrónico debe tener una estructura válida.' },
  )
  email: string;

  @ApiProperty({
    type: String,
    description: 'the password of user',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña no debe estar vacía.' })
  @Length(8, 15, {
    message: 'La contraseña debe tener entre 8 y 15 caracteres.',
  })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'the adress of user',
    required: true,
  })
  @IsString()
  @IsOptional()
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  address?: string;

  @ApiProperty({
    type: String,
    description: 'the phone of user',
    required: false,
  })
  @IsNumberString({}, { message: 'El número de teléfono debe ser un número.' })
  phone: string;

  @ApiProperty({
    type: String,
    description: 'the country of user',
    required: false,
  })
  @IsString()
  @IsNotEmpty({ message: 'El país no debe estar vacío.' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres.' })
  country: string;

  @ApiProperty({
    type: String,
    description: 'The city of user',
    required: false,
  })
  @IsString()
  @IsNotEmpty({ message: 'La ciudad no debe estar vacía.' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres.' })
  city: string;
}
