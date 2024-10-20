import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { ProductDto } from './Dtos/productDto';
import { CategoriesRepository } from '../categories/categories.repository';

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
        private readonly categoriesRepository: CategoriesRepository,
    ) { }

    private toProductDto(product: Products): ProductDto {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            stock: product.stock,
            imgUrl: product.imgUrl,
            category: product.category,
        };
    }

    async findOne(productId: string): Promise<Products | undefined> {
        return this.productsRepository.findOne({
            where: { id: productId },
            relations: ['category'],
        });
    }

    async save(product: Products): Promise<Products> {
        return this.productsRepository.save(product);
    }

    async updateProductImage(productId: string, imageUrl: string): Promise<ProductDto | undefined> {
        const product = await this.productsRepository.findOne({
            where: { id: productId },
        });

        if (!product) return undefined;

        product.imgUrl = imageUrl;

        const updatedProduct = await this.productsRepository.save(product);

        return this.toProductDto(updatedProduct);
    }

    async getProducts(page: number = 1, limit: number = 5): Promise<ProductDto[]> {
        const [products] = await this.productsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['category'],
        });

        return products.map(product => this.toProductDto(product));
    }

    async getProductById(id: string): Promise<ProductDto | undefined> {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['category'],
        });

        if (!product) return undefined;

        return this.toProductDto(product);
    }

    async createProduct(productData: any): Promise<Products> {
        const category = await this.categoriesRepository.findByName(productData.category);
    
        if (!category) {
          throw new NotFoundException(`Category '${productData.category}' not found`);
        }
    
        const newProduct = this.productsRepository.create({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          stock: productData.stock,
          imgUrl: productData.imgUrl,
          category: category,
        });
    
        return this.productsRepository.save(newProduct);
      }

    async updateProduct(id: string, updatedProductData: Partial<Omit<ProductDto, 'id'>>): Promise<ProductDto | undefined> {
        await this.productsRepository.update(id, updatedProductData);

        const updatedProduct = await this.productsRepository.findOne({
            where: { id },
            relations: ['category'],
        });

        if (!updatedProduct) return undefined;

        return this.toProductDto(updatedProduct);
    }

    async deleteProduct(id: string): Promise<ProductDto | undefined> {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['category'],
        });

        if (product) {
            await this.productsRepository.remove(product);
            return this.toProductDto(product);
        }

        return undefined;
    }
}
