import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Categories } from "./categories.entity";  
import { CategoriesDto } from "./Dtos/categoriesDto";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Categories)
        private categoryRepository: Repository<Categories>,
    ) {}

    async getCategories(page: number = 1, limit: number = 5): Promise<CategoriesDto[]> {
        const [categories, total] = await this.categoryRepository.findAndCount({
            skip: (page - 1) * limit,  
            take: limit,              
            relations: ['products'], 
        });

        return categories.map(category => ({
            id: category.id,
            name: category.name,
            products: category.products.map(product => ({
                id: product.id,
                name: product.name,
            })),
        }));
    }

    async findByName(name: string): Promise<Categories | null> {
        return await this.categoryRepository.findOne({ where: { name } });
    }
}
