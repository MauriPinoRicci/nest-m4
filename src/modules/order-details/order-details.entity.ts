import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"; 
import { Orders } from '../orders/orders.entity';
import { Products } from "../products/products.entity";

@Entity({ name: 'order_details' })
export class OrderDetails {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne(() => Orders, order => order.orderDetail)
    @JoinColumn()
    order: Orders;

    @ManyToMany(() => Products, product => product.orderDetails)
    products: Products[];
}
