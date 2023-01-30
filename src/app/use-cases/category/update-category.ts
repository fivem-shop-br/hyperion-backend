import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/category-repository';
import type { Categories as CategoryPrisma } from '@prisma/client';
import { Error } from 'src/utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';
import { Category } from 'src/app/entities/category';

type UpdateCategoryRequest = Category;
type UpdateCategoryResponse = CategoryPrisma;

@Injectable()
export class UpdateCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    request: UpdateCategoryRequest,
  ): Promise<UpdateCategoryResponse> {
    const { categoryId } = request;
    const category = await this.categoryRepository.findById(categoryId);

    if (!category)
      throw new Error({
        message: 'Categoria não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return await this.categoryRepository.update(request);
  }
}
