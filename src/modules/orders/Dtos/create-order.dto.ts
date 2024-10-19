import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({
        description: 'ID of the user placing the order',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Array of product IDs',
        type: [String],
        required: true,
    })
    @IsArray()
    @IsNotEmpty()
    products: string[]; 
}
