import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';

export interface CategorieProps {
  id: string;
  shop_slug: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Categorie {
  private _id: string;
  private props: CategorieProps;

  constructor(
    props: Replace<CategorieProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set categorieId(categorieId: string) {
    this.props.id = categorieId;
  }

  public get categorieId(): string {
    return this.props.id;
  }

  public set shop_slug(shop_slug: string) {
    this.props.shop_slug = shop_slug;
  }

  public get shop_slug(): string {
    return this.props.shop_slug;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
