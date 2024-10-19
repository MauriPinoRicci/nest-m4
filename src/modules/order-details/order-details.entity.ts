import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm"; 
import { Orders } from '../orders/orders.entity';
import { Products } from "../products/products.entity";

@Entity({ name: 'order_details' })
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @ManyToOne(() => Orders, order => order.orderDetails)
    order: Orders;

    @ManyToMany(() => Products, product => product.orderDetails)
    products: Products[];
}
