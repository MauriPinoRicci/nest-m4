import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Categories } from '../../categories/categories.entity';

export class ProductDto {
  @ApiProperty({
    type: String,
    description: 'ID of the product',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name of the product',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description of the product',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Price of the product',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Stock available for the product',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    type: String,
    description: 'Image URL of the product',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @ApiProperty({
    type: () => Categories,
    description: 'Category to which the product belongs',
    required: false,
  })
  @IsOptional()
  category?: Categories;
}
