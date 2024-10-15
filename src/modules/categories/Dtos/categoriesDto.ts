import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
    @ApiProperty({
        type: String,
        description: 'ID of the product',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @ApiProperty({
        type: String,
        description: 'Name of the product',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}

export class CategoriesDto {
    @ApiProperty({
        type: String,
        description: 'ID of the category',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @ApiProperty({
        type: String,
        description: 'Name of the category',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        type: [ProductDto],
        description: 'List of products in the category',
        required: true,
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    readonly products: ProductDto[];
}
