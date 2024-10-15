import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { ProductsRepository } from './products.repository'; 
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]),CategoriesModule],
  providers: [ProductsService, ProductsRepository,CloudinaryConfig,CloudinaryService], 
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
