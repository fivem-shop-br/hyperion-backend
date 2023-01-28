import { Categorie } from 'src/app/entities/categorie';

export class CategorieViewModel {
  static toHTTP(categorie: Categorie) {
    return {
      id: categorie.id,
      shop_slug: categorie.shop_slug,
      name: categorie.name,
      createdAt: categorie.createdAt,
      updatedAt: categorie.updatedAt,
    };
  }
}
