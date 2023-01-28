import { Categorie } from '../entities/categorie';

export abstract class CategorieRepository {
  abstract findAll(): Promise<Categorie[]>;
  abstract create(): Promise<Categorie>;
  abstract update(): Promise<Categorie>;
  abstract delete(): Promise<Categorie>;
}
