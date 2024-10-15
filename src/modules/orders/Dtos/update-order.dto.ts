import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    type: String,
    description: 'ID of the user who placed the order',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly userId?: string; 

  @ApiProperty({
    type: String,
    description: 'Date when the order was placed',
    required: false,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  readonly date?: string; 
}
