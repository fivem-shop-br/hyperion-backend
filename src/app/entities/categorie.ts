import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';

export interface CategorieProps {
  id: string;
  shop_id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
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

  public set shop_id(shop_id: string) {
    this.props.shop_id = shop_id;
  }

  public get shop_id(): string {
    return this.props.shop_id;
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
