import { HttpStatus, Injectable } from '@nestjs/common';
import { Categorie } from 'src/app/entities/categorie';
import { Error } from '../../../utils/error.filter';
import { CategorieRepository } from '../../repositories/categorie-repository';

interface deleteCategorieByIdRequest {
  id: string;
}

export interface deleteCategorieByIdResponse {
  categorie: Categorie;
}

@Injectable()
export class DeleteCategorieById {
  constructor(private categorieRepository: CategorieRepository) {}

  async execute(
    request: deleteCategorieByIdRequest,
  ): Promise<deleteCategorieByIdResponse> {
    const { id } = request;
    const categorie = await this.categorieRepository.delete(id);

    if (!categorie)
      throw new Error({
        message: 'Categoria não encontrada.',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return {
      categorie,
    };
  }
}
