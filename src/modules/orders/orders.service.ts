import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './orders.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { OrderDetailsService } from '../order-details/order-details.service';
import { CreateOrderDto } from './Dtos/create-order.dto';
import { createOrderDetailDto } from '../order-details/Dtos/create-order-detail.dto';
import { OrderResponseDto } from './Dtos/response-order.dto';
import { UpdateOrderDto } from './Dtos/update-order.dto';
import { ProductDto } from '../products/Dtos/productDto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders)
        private readonly orderRepository: Repository<Orders>,
        private readonly userService: UsersService,
        private readonly productService: ProductsService,
        private readonly orderDetailsService: OrderDetailsService,
    ) {}

    async create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
        const { userId, products: productIds } = createOrderDto;
    
        const user = await this.userService.getUsersById(userId.toString());
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
    
        const order = this.orderRepository.create({
            user,
            date: new Date(),
        });
    
        const orderEntity = await this.orderRepository.save(order);
    
        const products: ProductDto[] = await Promise.all(
            productIds.map(async (id) => {
                const product = await this.productService.getProductById(id);
                if (!product) {
                    throw new NotFoundException(`Product with ID ${id} not found`);
                }
                await this.productService.buyProduct(id);
                return product;
            })
        );
    
        const total = await this.calculateTotal(products);
        
        const orderDetailDto = new createOrderDetailDto({
            price: parseFloat(total.toFixed(2)),
            products: products,
            order: orderEntity,
        });
    
        const orderDetailEntity = await this.orderDetailsService.create(orderDetailDto);
    
        return new OrderResponseDto(orderDetailEntity);
    }
    
    private async calculateTotal(products: ProductDto[]): Promise<number> {
        return products.reduce((total, product) => total + product.price, 0);
    }

    async findAll(): Promise<Orders[]> {
        const orders = await this.orderRepository.find({
            relations: ['orderDetails', 'orderDetails.products'],
        });

        if (!orders.length) {
            throw new NotFoundException('No orders found');
        }

        return orders;
    }

    async findOne(id: string): Promise<OrderResponseDto> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['orderDetails'],
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        const orderDetail = await this.orderDetailsService.findOneByOrderId(order.id, ['products']);

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

    async deleteOrder(id: string): Promise<Orders | null> {
        const order = await this.orderRepository.findOneBy({ id });

        if (order) {
            await this.orderRepository.remove(order);
            return order; 
        }

        return null; 
    }
}
