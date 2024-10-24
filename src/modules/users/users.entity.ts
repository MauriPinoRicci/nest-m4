import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from '../orders/orders.entity';
import { Role } from './enum/role.enum';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 80, nullable: false })
  name: string;

  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Orders, (order) => order.user,{ onDelete: 'CASCADE' })
  orders: Orders[];

  @Column({ 
    type: 'varchar', 
    length: 10, 
    default: Role.User,  
  })
  admin: Role;
  
}
