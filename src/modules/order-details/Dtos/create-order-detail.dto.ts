import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsObject, IsArray } from 'class-validator';

export class createOrderDetailDto {
    @ApiProperty({
        type: Number,
        description: 'Precio total del pedido',
        required: true,
    })
    @IsNumber({}, { message: 'El precio debe ser un número.' })
    @IsNotEmpty({ message: 'El precio no debe estar vacío.' })
    price: number;

    @ApiProperty({
        type: Object,
        description: 'Detalles de la orden',
        required: true,
    })
    @IsObject({ message: 'La orden debe ser un objeto.' })
    @IsNotEmpty({ message: 'Los detalles de la orden no deben estar vacíos.' })
    order: object;

    @ApiProperty({
        type: [Object],
        description: 'Lista de productos asociados al pedido',
        required: true,
    })
    @IsArray({ message: 'Los productos deben ser un arreglo.' })
    @IsNotEmpty({ message: 'La lista de productos no debe estar vacía.' })
    products: Array<object>;

    constructor(partial: Partial<createOrderDetailDto> = {}) {
        Object.assign(this, partial);
    }
}
