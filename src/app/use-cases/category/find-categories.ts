import { Injectable } from '@nestjs/common';
import { Category } from 'src/app/entities/category';
import { CategoryRepository } from 'src/app/repositories/category-repository';

export interface FindAllBySlugCategoryResponse {
  category: Category[];
}

@Injectable()
export class FindAllBySlugCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(slug: string): Promise<FindAllBySlugCategoryResponse> {
    const category = await this.categoryRepository.findAllBySlug(slug);

    return {
      category,
    };
  }
}
