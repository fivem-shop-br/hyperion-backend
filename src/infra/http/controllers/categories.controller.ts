import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common/decorators';
import { Categorie } from 'src/app/entities/categorie';
import { FindAllBySlugCategorie } from 'src/app/use-cases/categorie/find-categories';
import { CreateCategorie as CreateCategorieU } from 'src/app/use-cases/categorie/create-categorie';
import createCategorie from '../dtos/create-categorie';
import { CategorieViewModel } from '../view-models/categories-view-model';
import deleteCategorie from '../dtos/delete-categorie';
import { DeleteCategorieById } from 'src/app/use-cases/categorie/delete-categorie';

@Controller()
export class CategoriesController {
  constructor(
    private findAllBySlug: FindAllBySlugCategorie,
    private createCategorie: CreateCategorieU,
    private deleteCategorieById: DeleteCategorieById,
  ) {}

  @Get('categories/:slug')
  async findAll(@Param() { slug }: { slug: string }) {
    const { categorie } = await this.findAllBySlug.execute(slug);
    return categorie.map(CategorieViewModel.toHTTP);
  }

  @Post('categorie')
  async create(@Body() data: createCategorie) {
    const categorie = new Categorie(data);
    return await this.createCategorie.execute(categorie);
  }

  @Delete('categorie')
  async delete(@Body() { id }: deleteCategorie) {
    const { categorie } = await this.deleteCategorieById.execute({ id });
    return CategorieViewModel.toHTTP(categorie);
  }
}
