import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './order-details.entity';
import { createOrderDetailDto } from './Dtos/create-order-detail.dto';
import { OrderDetailsRepository } from './order-details.repository';

@Injectable()
export class OrderDetailsService {
    constructor(
        private readonly orderDetailsRepository: OrderDetailsRepository,
    ) {}

    async create(createOrderDetailDto: createOrderDetailDto): Promise<OrderDetails> {
        return this.orderDetailsRepository.create(createOrderDetailDto);
    }

    async findOne(id: string): Promise<OrderDetails> {
        const orderDetail = await this.orderDetailsRepository.findOne(id);
        if (!orderDetail) {
            throw new NotFoundException(`OrderDetail with ID ${id} not found`);
        }
        return orderDetail;
    }

    async findOneByOrderId(orderId: string, relations: string[] = []): Promise<OrderDetails> {
        const orderDetail = await this.orderDetailsRepository.findOneByOrderId(orderId, relations);
        if (!orderDetail) {
            throw new NotFoundException(`Order detail with order ID ${orderId} not found`);
        }
        return orderDetail;
    }

    async findAll(): Promise<OrderDetails[]> {
        return this.orderDetailsRepository.findAll();
    }

    async update(id: string, updateOrderDetailDto: Partial<createOrderDetailDto>): Promise<OrderDetails | null> {
        const updatedOrderDetail = await this.orderDetailsRepository.update(id, updateOrderDetailDto);
        if (!updatedOrderDetail) {
            throw new NotFoundException(`OrderDetail with ID ${id} not found`);
        }
        return updatedOrderDetail;
    }

    async remove(id: string): Promise<void> {
        await this.orderDetailsRepository.remove(id);
    }
}
