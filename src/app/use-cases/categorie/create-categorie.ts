import { Injectable } from '@nestjs/common';
import type { Categories as CategoriePrisma } from '@prisma/client';
import { Error } from '../../../utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';
import { CategorieRepository } from 'src/app/repositories/categorie-repository';
import { Categorie } from 'src/app/entities/categorie';

type CreateCategorieRequest = Categorie;
type CreateCategorieResponse = CategoriePrisma;

@Injectable()
export class CreateCategorie {
  constructor(private categorieRepository: CategorieRepository) {}

  async execute(
    request: CreateCategorieRequest,
  ): Promise<CreateCategorieResponse> {
    const { name, shop_slug: slug } = request;
    const existSlug = await this.categorieRepository.findBySlug(slug);

    if (!existSlug)
      throw new Error({
        message: 'Essa shop_slug não existe.',
        statusCode: HttpStatus.CONFLICT,
      });

    const existCategorie = await this.categorieRepository.findByName(
      name,
      slug,
    );

    if (existCategorie)
      throw new Error({
        message: 'Essa categoria já foi cadastrada.',
        statusCode: HttpStatus.CONFLICT,
      });

    return await this.categorieRepository.create(request);
  }
}
