import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './order-details.entity';
import { createOrderDetailDto } from './Dtos/create-order-detail.dto';

@Injectable()
export class OrderDetailsRepository {
    constructor(
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepository: Repository<OrderDetails>,
    ) { }

    async create(createOrderDetailDto: createOrderDetailDto): Promise<OrderDetails> {
        const orderDetail = this.orderDetailsRepository.create(createOrderDetailDto);
        return await this.orderDetailsRepository.save(orderDetail);
    }

    async findOne(id: string): Promise<OrderDetails | null> {
        const orderDetail = await this.orderDetailsRepository.findOne({
            where: { id },
            relations: ['order', 'products'], 
        });

        if (!orderDetail) {
            throw new NotFoundException(`OrderDetail with ID ${id} not found`);
        }

        return orderDetail;
    }

    async findOneByOrderId(orderId: string, relations: string[] = []): Promise<OrderDetails | null> {
        return this.orderDetailsRepository.findOne({
            where: { order: { id: orderId } },
            relations,
        });
    }

    async findAll(): Promise<OrderDetails[]> {
        return this.orderDetailsRepository.find({
            relations: ['order', 'products'], 
        });
    }

    async update(id: string, updateOrderDetailDto: Partial<createOrderDetailDto>): Promise<OrderDetails | null> {
        const orderDetail = await this.orderDetailsRepository.preload({
            id,
            ...updateOrderDetailDto,
        });

        if (!orderDetail) {
            return null;
        }

        return this.orderDetailsRepository.save(orderDetail);
    }

    async remove(id: string): Promise<void> {
        const orderDetail = await this.orderDetailsRepository.findOne({
            where: { id },
        });

        if (!orderDetail) {
            throw new NotFoundException(`OrderDetail with ID ${id} not found`);
        }

        await this.orderDetailsRepository.remove(orderDetail);
    }
}
