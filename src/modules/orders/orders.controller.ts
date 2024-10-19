import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './Dtos/create-order.dto';
import { UpdateOrderDto } from './Dtos/update-order.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    orderRepository: any;
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return await this.ordersService.create(createOrderDto);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.ordersService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return await this.ordersService.update(id, updateOrderDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        const order = await this.ordersService.deleteOrder(id);

        if (!order) {
            throw new HttpException(
                { message: `Order with ID ${id} not found` },
                HttpStatus.NOT_FOUND
            );
        }

        return { message: 'Order successfully deleted.' };
    }
}
