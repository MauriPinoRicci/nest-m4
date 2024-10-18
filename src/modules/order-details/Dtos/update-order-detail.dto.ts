import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsArray, IsOptional } from 'class-validator';

export class updateOrderDetailDto {
    @ApiProperty({
        type: Number,
        description: 'Precio total del pedido',
        required: false,
    })
    @IsNumber({}, { message: 'El precio debe ser un número.' })
    @IsOptional()
    price?: number;

    @ApiProperty({
        type: Object,
        description: 'Detalles de la orden',
        required: false,
    })
    @IsObject({ message: 'La orden debe ser un objeto.' })
    @IsOptional()
    order?: object;

    @ApiProperty({
        type: [Object],
        description: 'Lista de productos asociados al pedido',
        required: false,
    })
    @IsArray({ message: 'Los productos deben ser un arreglo.' })
    @IsOptional()
    products?: Array<{ id: string }>;

    constructor(partial: Partial<updateOrderDetailDto> = {}) {
        Object.assign(this, partial);
    }
}
