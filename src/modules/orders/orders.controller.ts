import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './Dtos/create-order.dto';
import { UpdateOrderDto } from './Dtos/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
    async remove(id: string): Promise<boolean> {
        const order = await this.orderRepository.findOneBy({ id });
        
        if (!order) {
            return false;
        }
    
        await this.orderRepository.remove(order);
        return true;
    }
}
