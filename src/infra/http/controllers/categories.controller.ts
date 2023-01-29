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
import { FindAllByIdCategorie } from 'src/app/use-cases/categorie/find-categories';
import { CreateCategorie as CreateCategorieU } from 'src/app/use-cases/categorie/create-categorie';
import createCategorie from '../dtos/create-categorie';
import { CategorieViewModel } from '../view-models/categories-view-model';
import { DeleteCategorieById } from 'src/app/use-cases/categorie/delete-categorie';
import { UpdateCategorie as UpdateCategorieU } from 'src/app/use-cases/categorie/update-categorie';
import updateCategorie from '../dtos/update-categorie';

@Controller()
export class CategoriesController {
  constructor(
    private findAllById: FindAllByIdCategorie,
    private createCategorie: CreateCategorieU,
    private deleteCategorieById: DeleteCategorieById,
    private updateCategorie: UpdateCategorieU,
  ) {}

  @Get('categories/:id')
  async findAll(@Param() { id }: { id: string }) {
    const { categorie } = await this.findAllById.execute(id);
    return categorie.map(CategorieViewModel.toHTTP);
  }

  @Post('categorie')
  async create(@Body() data: createCategorie) {
    const categorie = new Categorie(data);
    return await this.createCategorie.execute(categorie);
  }

  @Patch('categorie')
  async update(@Body() data: updateCategorie) {
    const categorie = new Categorie(data);
    return await this.updateCategorie.execute(categorie);
  }

  @Delete('categorie/:id')
  async delete(@Param() { id }: { id: string }) {
    const { categorie } = await this.deleteCategorieById.execute({ id });
    return CategorieViewModel.toHTTP(categorie);
  }
}
