import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Name of the product',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Description of the product',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Price of the product',
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Stock available for the product',
  })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Image URL of the product',
  })
  @IsString()
  @IsOptional()
  imgUrl?: string;

}
