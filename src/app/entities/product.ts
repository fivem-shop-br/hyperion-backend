import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';

export interface ProductProps {
  id: string;
  categoryId: string;
  name: string;
  image: string[];
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  private _id: string;
  private props: ProductProps;

  constructor(
    props: Replace<ProductProps, { createdAt?: Date; updatedAt?: Date }>,
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

  public set productId(productId: string) {
    this.props.id = productId;
  }

  public get productId(): string {
    return this.props.id;
  }

  public set categoryId(categoryId: string) {
    this.props.categoryId = categoryId;
  }

  public get categoryId(): string {
    return this.props.categoryId;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set image(image: string[]) {
    this.props.image = image;
  }

  public get image(): string[] {
    return this.props.image;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
