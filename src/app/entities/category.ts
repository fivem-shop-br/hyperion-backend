import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';

export interface CategoryProps {
  id: string;
  shop_slug?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category {
  private _id: string;
  private props: CategoryProps;

  constructor(
    props: Replace<CategoryProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
  }

  public get id() {
    return this._id;
  }

  public set categoryId(categoryId: string) {
    this.props.id = categoryId;
  }

  public get categoryId(): string {
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
