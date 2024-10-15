import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoriesDto } from './Dtos/categoriesDto';

@Injectable()
export class CategoriesService {
    
    constructor(private categoriesRepository : CategoriesRepository) {}

    async getCategories(page: number = 1, limit: number = 5): Promise<CategoriesDto[]> {
        return this.categoriesRepository.getCategories(page, limit);
    }

}
