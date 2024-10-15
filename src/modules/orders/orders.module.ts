import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './orders.entity';
import { UserModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { OrderDetailsModule } from '../order-details/order-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
    UserModule,
    ProductsModule,
    OrderDetailsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
