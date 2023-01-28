import { Categorie } from '../entities/categorie';
import type { Categories as CategoriePrisma } from '@prisma/client';

export abstract class CategorieRepository {
  abstract findAllBySlug(slug: string): Promise<Categorie[]>;
  abstract findByName(name: string, slug: string): Promise<Categorie>;
  abstract findById(id: string): Promise<Categorie>;
  abstract findBySlug(slug: string): Promise<Categorie>;
  abstract create(categorie: Categorie): Promise<CategoriePrisma>;
  abstract update(categorie: Categorie): Promise<CategoriePrisma>;
  abstract delete(categorieId: string): Promise<Categorie>;
}
