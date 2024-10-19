import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional, IsEmpty } from 'class-validator';
import { Orders } from 'src/modules/orders/orders.entity';

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'ID of user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    description: 'email of user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'name of user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'password of user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'address of user',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;


  @ApiProperty({
    type: String,
    description: 'country of user',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    type: String,
    description: 'city of user',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: Date,
    description: 'user creation date',
    required: false,
  })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    type: String,
    description: 'orders of user',
    required: false,
  })
  @IsOptional()
  orders?: Orders[];
}
