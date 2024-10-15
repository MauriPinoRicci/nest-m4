import { Repository } from 'typeorm';
import { Orders } from './orders.entity';

export class OrdersRepository extends Repository<Orders> {
    async getAllOrders(page: number = 1, limit: number = 10): Promise<Orders[]> {
        return this.find({
            take: limit,
            skip: (page - 1) * limit,
        });
    }

    async getOrderById(id: string): Promise<Orders | null> {
        return this.findOne({
            where: { id },
        });
    }

    async createOrder(orderData: Omit<Orders, 'id'>): Promise<Orders> {
        const newOrder = this.create(orderData);
        return this.save(newOrder);
    }

    async updateOrder(id: string, updateData: Partial<Omit<Orders, 'id'>>): Promise<Orders | null> {
        await this.update(id, updateData);
        return this.findOne({
            where: { id },
        });
    }

    async deleteOrder(id: string): Promise<Orders | null> {
        const order = await this.findOne({
            where: { id },
        });

        if (order) {
            await this.remove(order);
        }

        return order;
    }
}
