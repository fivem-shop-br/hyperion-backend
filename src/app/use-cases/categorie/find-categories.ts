import { Injectable } from '@nestjs/common';
import { Categorie } from 'src/app/entities/categorie';
import { CategorieRepository } from 'src/app/repositories/categorie-repository';

export interface findAllCategorieResponse {
  categorie: Categorie[];
}

@Injectable()
export class FindAllCategorie {
  constructor(private categorieRepository: CategorieRepository) {}

  async execute(): Promise<findAllCategorieResponse> {
    const categorie = await this.categorieRepository.findAll();

    return {
      categorie,
    };
  }
}
