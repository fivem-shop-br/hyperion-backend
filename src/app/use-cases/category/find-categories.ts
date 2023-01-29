import { Injectable } from '@nestjs/common';
import { Category } from 'src/app/entities/category';
import { CategoryRepository } from 'src/app/repositories/category-repository';

export interface FindAllByIdCategoryResponse {
  category: Category[];
}

@Injectable()
export class FindAllByIdCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<FindAllByIdCategoryResponse> {
    const category = await this.categoryRepository.findAllById(id);

    return {
      category,
    };
  }
}
