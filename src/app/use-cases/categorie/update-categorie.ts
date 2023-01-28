import { Injectable } from '@nestjs/common';
import { CategorieRepository } from '../../repositories/categorie-repository';
import type { Categories as CategoriePrisma } from '@prisma/client';
import { Error } from '../../../utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';
import { Categorie } from 'src/app/entities/categorie';

type UpdateCategorieRequest = Categorie;
type UpdateCategorieResponse = CategoriePrisma;

@Injectable()
export class UpdateCategorie {
  constructor(private categorieRepository: CategorieRepository) {}

  async execute(
    request: UpdateCategorieRequest,
  ): Promise<UpdateCategorieResponse> {
    const { name } = request;
    const categorie = await this.categorieRepository.findByName(name);

    if (!categorie) {
      throw new Error({
        message: 'Categoria não encontrado.',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return await this.categorieRepository.update(request);
  }
}
