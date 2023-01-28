import { Injectable } from '@nestjs/common';
import type { Categories as CategoriePrisma } from '@prisma/client';
import { Error } from '../../../utils/error.filter';
import { HttpStatus } from '@nestjs/common/enums';
import { CategorieRepository } from 'src/app/repositories/categorie-repository';
import { Categorie } from 'src/app/entities/categorie';
import { ShopRepository } from 'src/app/repositories/shops-repository';

type CreateCategorieRequest = Categorie;
type CreateCategorieResponse = CategoriePrisma;

@Injectable()
export class CreateCategorie {
  constructor(
    private categorieRepository: CategorieRepository,
    private shopRepository: ShopRepository,
  ) {}

  async execute(
    request: CreateCategorieRequest,
  ): Promise<CreateCategorieResponse> {
    const { name, shop_id } = request;
    const existShopId = await this.shopRepository.findById(shop_id);

    console.log(existShopId);

    if (!existShopId)
      throw new Error({
        message: 'Essa shop_id não existe.',
        statusCode: HttpStatus.CONFLICT,
      });

    const existName = await this.categorieRepository.findByName(name, shop_id);

    if (existName)
      throw new Error({
        message: 'Essa categoria já foi cadastrada.',
        statusCode: HttpStatus.CONFLICT,
      });

    return await this.categorieRepository.create(request);
  }
}
