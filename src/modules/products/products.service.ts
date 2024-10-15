import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Products } from "./products.entity";
import { ProductDto } from "./Dtos/productDto";
import { ProductsMock } from "src/seeds/products/products-mock";
import { CategoriesRepository } from "../categories/categories.repository";

@Injectable()
export class ProductsService {
    constructor(
        private productsRepository: ProductsRepository,
        private categoriesRepository: CategoriesRepository 
    ) { }


    async saveProductImage(productId: string, imageUrl: string, publicId: string) {
        const product = await this.productsRepository.findOne(productId);

        if (!product) {
            throw new Error('Producto no encontrado');
        }

        product.imgUrl = imageUrl;
        product.publicId = publicId;

        await this.productsRepository.save(product);
    }

    async getProducts(page: number = 1, limit: number = 5): Promise<ProductDto[]> {
        return this.productsRepository.getProducts(page, limit);
    }

    async seedProducts(): Promise<void> {
        for (const productData of ProductsMock) {
            const category = await this.categoriesRepository.findByName(productData.category);

            if (!category) {
                throw new Error(`Category ${productData.category} not found`);
            }

            const existingProduct = await this.productsRepository.getProductById(productData.name);

            if (!existingProduct) {
                await this.productsRepository.createProduct({
                    ...productData,
                    category,
                    imgUrl: ""
                });
            }
        }
    }
    
    async getProductById(id: string): Promise<ProductDto | null> {
        return this.productsRepository.getProductById(id);
    }

    async createProduct(product: Omit<ProductDto, 'id'>): Promise<{ id: string }> {
        const result = await this.productsRepository.createProduct(product);
        return { id: result.id };
    }

    async modifyProduct(id: string, updatedProductData: Partial<Omit<Products, 'id'>>): Promise<ProductDto | null> {
        await this.productsRepository.getProductById(id);
        return this.productsRepository.updateProduct(id, updatedProductData);
    }

    async deleteProduct(id: string): Promise<{ id: string } | null> {
        const deletedProduct = await this.productsRepository.deleteProduct(id);
        return deletedProduct ? { id: deletedProduct.id } : null;
    }

    async updateProduct(id: string, updatedProductData: Partial<Omit<Products, 'id'>>): Promise<ProductDto | undefined> {
        return this.productsRepository.updateProduct(id, updatedProductData);
    }

    async buyProduct(id: string): Promise<number> {
        const product = await this.productsRepository.getProductById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.stock === 0) {
            throw new Error('Out of Stock');
        }

        await this.productsRepository.updateProduct(id, {
            stock: product.stock - 1,
        });
        console.log('Product bought successfully');
        return product.price;
    }
}
