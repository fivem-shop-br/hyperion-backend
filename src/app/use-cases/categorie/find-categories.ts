import { Injectable } from '@nestjs/common';
import { Categorie } from 'src/app/entities/categorie';
import { CategorieRepository } from 'src/app/repositories/categorie-repository';

export interface FindAllBySlugCategorieResponse {
  categorie: Categorie[];
}

@Injectable()
export class FindAllBySlugCategorie {
  constructor(private categorieRepository: CategorieRepository) {}

  async execute(slug: string): Promise<FindAllBySlugCategorieResponse> {
    const categorie = await this.categorieRepository.findAllBySlug(slug);

    return {
      categorie,
    };
  }
}
