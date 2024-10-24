import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../categories/categories.entity";
import { OrderDetails } from "../order-details/order-details.entity";

@Entity({ name: 'products' })
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;
    
    @Column({ nullable: true }) 
    publicId: string;

    @Column({ type: 'integer', nullable: false })
    stock: number;

    @Column({ type: 'text', nullable: true })
    imgUrl: string;

    @ManyToOne(() => Categories, category => category.products)
    category: Categories;

    @ManyToMany(() => OrderDetails, orderDetail => orderDetail.products,{ onDelete: 'CASCADE' })
    @JoinTable()
    orderDetails: OrderDetails[];

}
