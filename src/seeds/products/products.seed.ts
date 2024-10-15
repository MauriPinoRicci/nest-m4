import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/modules/categories/categories.entity";
import { Products } from "src/modules/products/products.entity";
import { Repository } from "typeorm";
import { ProductsMock } from "./products-mock";


@Injectable()
export class ProductsSeed {
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
        @InjectRepository(Categories)
        private readonly categoryRepository: Repository<Categories>,
    ) { }

    async findCategoryByName(category: string) {
        const foundCategory = await this.categoryRepository.findOne({
            where: { name: category },
        });

        if (!foundCategory) {
            throw new Error(`Category ${category}not found`);
        }
        return foundCategory;
    }

    async seed() {
        const existingProductNames = (await this.productRepository.find()).map(
            (product) => product.name,
        );

        for (const productData of ProductsMock) {
            if (!existingProductNames.includes(productData.name)) {
                const product = new Products();
                product.name = productData.name;
                product.description = productData.description;
                product.price = productData.price;
                product.stock = productData.stock;
                product.category = await this.findCategoryByName(productData.category);
                await this.productRepository.save(product);
            }
        }
    }
}