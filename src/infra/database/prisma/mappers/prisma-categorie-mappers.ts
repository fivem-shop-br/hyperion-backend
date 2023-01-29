import { Categories as RawCategorie } from '@prisma/client';
import { Categorie } from 'src/app/entities/categorie';

export class PrismaCategorieMapper {
  static toDomain(raw: RawCategorie): Categorie {
    return new Categorie(
      {
        id: raw.id,
        name: raw.name,
        shop_id: raw.shop_id,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPrisma(categorie: Categorie) {
    return {
      id: categorie.categorieId,
      name: categorie.name,
      shop_id: categorie.shop_id,
      createdAt: categorie.createdAt,
      updatedAt: categorie.updatedAt,
    };
  }
}
