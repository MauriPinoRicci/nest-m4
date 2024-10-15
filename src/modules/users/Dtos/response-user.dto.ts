import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class UserResponseDto {
  @ApiProperty({
    type: String,
    description: 'ID of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email address of the user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Address of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    type: String,
    description: 'Phone number of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'Country of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    type: String,
    description: 'City of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;

  constructor(partial: Partial<UserResponseDto>) {
    const { id, name, email, address, phone, country, city } = partial;
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.country = country;
    this.city = city;
  }
}
