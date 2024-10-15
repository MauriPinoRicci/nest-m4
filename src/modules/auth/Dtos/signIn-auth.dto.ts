import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignInAuthDto {
    @ApiProperty({
        type: String,
        description: 'User email address',
        required: true,
    })
    @IsEmail({}, { message: 'The email address must have a valid structure.' })
    @IsNotEmpty({ message: 'The email address must not be empty.' })
    email: string;

    @ApiProperty({
        type: String,
        description: 'User password',
        required: true,
    })
    @IsString({ message: 'The password must be a string.' })
    @IsNotEmpty({ message: 'The password must not be empty.' })
    password: string;

    constructor(partial: Partial<SignInAuthDto>) {
        Object.assign(this, partial);
    }
}
