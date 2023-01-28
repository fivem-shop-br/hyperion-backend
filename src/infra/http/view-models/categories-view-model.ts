import { Categorie } from 'src/app/entities/categorie';

export class CategorieViewModel {
  static toHTTP(categorie: Categorie) {
    return {
      id: categorie.id,
      shop_id: categorie.shop_id,
      name: categorie.name,
      createdAt: categorie.createdAt,
      updatedAt: categorie.updatedAt,
    };
  }
}
