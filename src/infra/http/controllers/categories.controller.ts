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
import { FindAllByIdCategory } from 'src/app/use-cases/category/find-categories';
import { CreateCategory as CreateCategoryU } from 'src/app/use-cases/category/create-category';
import createCategory from '../dtos/create-category';
import { CategoryViewModel } from '../view-models/categories-view-model';
import { DeleteCategoryById } from 'src/app/use-cases/category/delete-category';
import { UpdateCategory as UpdateCategoryU } from 'src/app/use-cases/category/update-category';
import updateCategory from '../dtos/update-category';

@Controller()
export class CategorysController {
  constructor(
    private findAllById: FindAllByIdCategory,
    private createCategory: CreateCategoryU,
    private deleteCategoryById: DeleteCategoryById,
    private updateCategory: UpdateCategoryU,
  ) {}

  @Get('categories/:id')
  async findAll(@Param() { id }: { id: string }) {
    const { category } = await this.findAllById.execute(id);
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
