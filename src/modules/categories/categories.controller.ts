import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './Dtos/categoriesDto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get('/seeder')
    @HttpCode(HttpStatus.OK)
    async getProducts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5
    ): Promise<CategoriesDto[]> {
        return this.categoriesService.getCategories(page, limit);
    }

}
