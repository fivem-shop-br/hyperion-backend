import { Injectable } from '@nestjs/common';
import { Categorie } from 'src/app/entities/categorie';
import { CategorieRepository } from 'src/app/repositories/categorie-repository';

export interface FindAllByIdCategorieResponse {
  categorie: Categorie[];
}

@Injectable()
export class FindAllByIdCategorie {
  constructor(private categorieRepository: CategorieRepository) {}

  async execute(id: string): Promise<FindAllByIdCategorieResponse> {
    const categorie = await this.categorieRepository.findAllById(id);

    return {
      categorie,
    };
  }
}
