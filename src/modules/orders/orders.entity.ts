import { Column, Entity, JoinColumn, OneToOne, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from '../users/users.entity';  
import { OrderDetails } from '../order-details/order-details.entity';

@Entity({ name: 'orders' })
export class Orders {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @ManyToOne(() => Users, user => user.orders , { nullable: false })
    user: Users;

    @OneToOne(() => OrderDetails, orderDetails => orderDetails.order, { cascade: true, eager: true })
    @JoinColumn()
    orderDetail: OrderDetails;
}
