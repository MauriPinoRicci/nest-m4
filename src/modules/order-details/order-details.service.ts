import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetails } from './order-details.entity';
import { createOrderDetailDto } from './Dtos/create-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
    constructor(
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepository: Repository<OrderDetails>,
    ) { }

    async create(createOrderDetailDto: createOrderDetailDto): Promise<OrderDetails> {
        const orderDetail = this.orderDetailsRepository.create(createOrderDetailDto);
        return await this.orderDetailsRepository.save(orderDetail);
    }

    async findOneByOrderId(orderId: string, relations: string[] = []): Promise<OrderDetails> {
        const orderDetail = await this.orderDetailsRepository.findOne({
            where: { order: { id: orderId } },
            relations,
        });

        if (!orderDetail) {
            throw new NotFoundException(`Order detail with order ID ${orderId} not found`);
        }

        return orderDetail;
    }
}
