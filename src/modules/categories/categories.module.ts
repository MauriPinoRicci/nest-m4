import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "./categories.entity"; 

@Module({
    imports: [TypeOrmModule.forFeature([Categories])], 
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository], 
    exports: [CategoriesService,CategoriesRepository],
})
export class CategoriesModule {}
