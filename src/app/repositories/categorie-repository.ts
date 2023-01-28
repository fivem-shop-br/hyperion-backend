import { Categorie } from '../entities/categorie';
import type { Categories as CategoriePrisma } from '@prisma/client';

export abstract class CategorieRepository {
  abstract findAll(): Promise<Categorie[]>;
  abstract findByName(name: string): Promise<Categorie[]>;
  abstract create(categorie: Categorie): Promise<CategoriePrisma>;
  abstract update(categorie: Categorie): Promise<CategoriePrisma>;
  abstract delete(categorieId: string): Promise<Categorie>;
}
