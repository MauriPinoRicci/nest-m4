import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsEmail, Matches, IsOptional, IsNumberString, IsEnum } from 'class-validator';
import { Role } from 'src/modules/users/enum/role.enum'; // Importa tu enum de roles

export class SignUpAuthDto {
    @ApiProperty({
        type: String,
        description: 'User name',
        required: true,
        minLength: 3,
        maxLength: 80,
    })
    @IsString()
    @IsNotEmpty({ message: 'The name must not be empty.' })
    @Length(3, 80, { message: 'The name must be between 3 and 80 characters long.' })
    name: string;

    @ApiProperty({
        type: String,
        description: 'User email address',
        required: true,
    })
    @IsEmail({}, { message: 'The email address must have a valid structure.' })
    email: string;

    @ApiProperty({
        type: String,
        description: 'User password',
        required: true,
        minLength: 8,
        maxLength: 20,
    })
    @IsString()
    @IsNotEmpty({ message: 'The password must not be empty.' })
    @Length(8, 20, { message: 'The password must be between 8 and 20 characters long.' })
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).'
    })
    password: string;

    @ApiProperty({
        type: String,
        description: 'User password confirmation',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;

    @ApiProperty({
        type: String,
        description: 'User address',
        required: false,
        minLength: 3,
        maxLength: 80,
    })
    @IsString()
    @IsOptional()
    @Length(3, 80, { message: 'The address must be between 3 and 80 characters long.' })
    address?: string;

    @ApiProperty({
        type: String,
        description: 'User phone number',
        required: true,
    })
    @IsNumberString({}, { message: 'The phone number must be a number.' })
    phone: string;

    @ApiProperty({
        type: String,
        description: 'User country',
        required: true,
        minLength: 5,
        maxLength: 20,
    })
    @IsString()
    @IsNotEmpty({ message: 'The country must not be empty.' })
    @Length(5, 20, { message: 'The country must be between 5 and 20 characters long.' })
    country: string;

    @ApiProperty({
        type: String,
        description: 'User city',
        required: true,
        minLength: 5,
        maxLength: 20,
    })
    @IsString()
    @IsNotEmpty({ message: 'The city must not be empty.' })
    @Length(5, 20, { message: 'The city must be between 5 and 20 characters long.' })
    city: string;

    @ApiProperty({
        type: String,
        description: 'User role',
        enum: Role, 
        required: false,
    })
    @IsEnum(Role, { message: 'The role must be either Admin or User.' })
    @IsOptional()  
    admin?: Role = Role.User;

    constructor(partial: Partial<SignUpAuthDto>) {
        Object.assign(this, partial);
    }
}
