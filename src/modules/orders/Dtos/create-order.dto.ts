import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductId {
  @ApiProperty({
    type: String,
    description: 'ID of the product',
    required: true,
  })
  @IsString()
  id: string;
}

export class CreateOrderDto {
  @ApiProperty({
    type: String,
    description: 'ID of the user placing the order',
    required: true,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    type: [ProductId],
    description: 'Array of products included in the order, each represented by its ID',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductId)
  products: ProductId[];
}
