import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/modules/categories/categories.entity";
import { In, Repository } from "typeorm";
import { categories } from "./categories-mock";

@Injectable()
export class CategoriesSeed {
    constructor(
        @InjectRepository(Categories)
        private readonly categoryRepository: Repository<Categories>,
    ) { }


    async seed() {
        const existingCategories = await this.categoryRepository.find({
            where: { name: In(categories) },
        });


        for (const categoryName of categories) {
            if (
                !existingCategories.some((categories) => categories.name === categoryName)
            ) {
                const categories = new Categories();
                categories.name = categoryName;
                await this.categoryRepository.save(categories);
            }
        }
    }
}