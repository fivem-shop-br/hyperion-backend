import { HttpStatus, Injectable } from '@nestjs/common';
import { Category } from 'src/app/entities/category';
import { Error } from 'src/utils/error.filter';
import { CategoryRepository } from 'src/app/repositories/category-repository';

interface deleteCategoryByIdRequest {
  id: string;
}

export interface deleteCategoryByIdResponse {
  category: Category;
}

@Injectable()
export class DeleteCategoryById {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(
    request: deleteCategoryByIdRequest,
  ): Promise<deleteCategoryByIdResponse> {
    const { id } = request;
    const category = await this.categoryRepository.delete(id);

    if (!category)
      throw new Error({
        message: 'Categoria não encontrada.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return {
      category,
    };
  }
}
