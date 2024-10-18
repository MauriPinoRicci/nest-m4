import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
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

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return await this.ordersService.update(id, updateOrderDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Order successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Order not found.' })
    async remove(@Param('id') id: string): Promise<void> {
        const order = await this.ordersService.deleteOrder(id);

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
    }
}
