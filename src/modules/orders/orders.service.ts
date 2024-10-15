import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './orders.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { OrderDetailsService } from '../order-details/order-details.service';
import { CreateOrderDto, ProductId } from './Dtos/create-order.dto';
import { createOrderDetailDto } from '../order-details/Dtos/create-order-detail.dto';
import { OrderResponseDto } from './Dtos/response-order.dto';
import { UpdateOrderDto } from './Dtos/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders)
        private readonly orderRepository: Repository<Orders>,
        private readonly userService: UsersService,
        private readonly productService: ProductsService,
        private readonly orderDetailsService: OrderDetailsService,
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
        const { userId, products } = createOrderDto;
        
        const user = await this.userService.getUsersById(userId.toString());

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const order = this.orderRepository.create({
            user,
            date: new Date(),
        });

        const orderEntity = await this.orderRepository.save(order);

        const total = await this.calculateTotal(products);

        const orderDetailDto = new createOrderDetailDto();
        orderDetailDto.price = total;
        orderDetailDto.products = products;
        orderDetailDto.order = orderEntity;

        const orderDetailEntity = await this.orderDetailsService.create(orderDetailDto);

        return new OrderResponseDto(orderDetailEntity);
    }

    private async calculateTotal(products: Array<ProductId>): Promise<number> {
        let total = 0;
        for (const product of products) {
            total += await this.productService.buyProduct(product.id);
        }
        return total;
    }

    async findAll(): Promise<Orders[]> {
        return this.orderRepository.find();
    }

    async findOne(id: string): Promise<OrderResponseDto> {
        const order = await this.orderRepository.findOne({
            where: { id },
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        const orderDetail = await this.orderDetailsService.findOneByOrderId(
            order.id,
            ['products', 'order'],
        );

        return new OrderResponseDto(orderDetail);
    }

    async update(id: string, updateOrderDto: Partial<UpdateOrderDto>): Promise<Orders> {
        const order = await this.orderRepository.preload({
            id,
            ...updateOrderDto,
            date: updateOrderDto.date ? new Date(updateOrderDto.date) : undefined,
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return this.orderRepository.save(order);
    }

    async remove(id: string): Promise<void> {
        const order = await this.orderRepository.findOneBy({ id });

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        await this.orderRepository.remove(order);
    }
}
