import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common/decorators';
import { Category } from 'src/app/entities/category';
import { FindAllBySlugCategory } from 'src/app/use-cases/category/find-categories';
import { CreateCategory as CreateCategoryU } from 'src/app/use-cases/category/create-category';
import createCategory from '../dtos/create-category';
import { CategoryViewModel } from '../view-models/categories-view-model';
import { DeleteCategoryById } from 'src/app/use-cases/category/delete-category';
import { UpdateCategory as UpdateCategoryU } from 'src/app/use-cases/category/update-category';
import updateCategory from '../dtos/update-category';

@Controller()
export class CategorysController {
  constructor(
    private findAllBySlug: FindAllBySlugCategory,
    private createCategory: CreateCategoryU,
    private deleteCategoryById: DeleteCategoryById,
    private updateCategory: UpdateCategoryU,
  ) {}

  @Get('categories/:slug')
  async findAll(@Param() { slug }: { slug: string }) {
    const { category } = await this.findAllBySlug.execute(slug);
    return category.map(CategoryViewModel.toHTTP);
  }

  @Post('category')
  async create(@Body() data: createCategory) {
    const category = new Category(data);
    return await this.createCategory.execute(category);
  }

  @Patch('category')
  async update(@Body() data: updateCategory) {
    const category = new Category(data);
    return await this.updateCategory.execute(category);
  }

  @Delete('category/:id')
  async delete(@Param() { id }: { id: string }) {
    const { category } = await this.deleteCategoryById.execute({ id });
    return CategoryViewModel.toHTTP(category);
  }
}
