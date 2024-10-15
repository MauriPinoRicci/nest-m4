import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer'; 
import { OrderDetails } from 'src/modules/order-details/order-details.entity';

export class UserDto {
    @ApiProperty({
        type: String,
        description: 'ID of the user who placed the order',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly id: string;
}

export class OrderDto {
    @ApiProperty({
        type: String,
        description: 'ID of the order',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @ApiProperty({
        type: String,
        description: 'Date when the order was placed',
        required: false,
        format: 'date-time',
    })
    @IsOptional()
    @IsDate()
    readonly date?: Date;

    @ApiProperty({
        type: UserDto,
        description: 'User who placed the order',
        required: true,
    })
    @ValidateNested()
    @Type(() => UserDto) 
    readonly user: UserDto;
}

export class OrderResponseDto {
    @ApiProperty({
        type: String,
        description: 'ID of the order response',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @ApiProperty({
        type: Number,
        description: 'Total price of the order',
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @ApiProperty({
        type: Array,
        description: 'List of products in the order',
        required: true,
    })
    @IsArray()
    readonly products: object[];

    @ApiProperty({
        type: OrderDto,
        description: 'Order details',
        required: true,
    })
    @ValidateNested()
    @Type(() => OrderDto)
    readonly order: OrderDto;

    constructor(orderDetails: OrderDetails) {
        this.id = orderDetails.id;
        this.price = orderDetails.price;
        this.products = orderDetails.products;
        this.order = {
            id: orderDetails.order.id,
            date: orderDetails.order.date,
            user: {
                id: orderDetails.order.user.id,
            },
        };
    }
}
