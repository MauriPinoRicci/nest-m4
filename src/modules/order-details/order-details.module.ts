import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetails } from "./order-details.entity"; 
import { OrderDetailsRepository } from "./order-details.repository";
import { OrderDetailsService } from "./order-details.service";
import { OrderDetailsController } from "./order-details.controller";

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetails])],
    controllers: [OrderDetailsController],
    providers: [OrderDetailsService, OrderDetailsRepository],
    exports: [OrderDetailsService, OrderDetailsRepository], 
})
export class OrderDetailsModule {}
