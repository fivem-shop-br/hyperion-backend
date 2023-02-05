import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/Replace';

export interface ShopsProps {
  id: string;
  slug: string;
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  domain: string;
  planType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Shop {
  private _id: string;
  private props: ShopsProps;

  constructor(
    props: Replace<ShopsProps, { createdAt?: Date; updatedAt?: Date }>,
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

  public set shopId(shopId: string) {
    this.props.id = shopId;
  }

  public get shopId(): string {
    return this.props.id;
  }

  public set slug(slug: string) {
    this.props.slug = slug;
  }

  public get slug(): string {
    return this.props.slug;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set logo(logo: string) {
    this.props.logo = logo;
  }

  public get logo(): string {
    return this.props.logo;
  }

  public set banner(banner: string) {
    this.props.banner = banner;
  }

  public get banner(): string {
    return this.props.banner;
  }

  public set favicon(favicon: string) {
    this.props.favicon = favicon;
  }

  public get favicon(): string {
    return this.props.favicon;
  }

  public set primaryColor(primaryColor: string) {
    this.props.primaryColor = primaryColor;
  }

  public get primaryColor(): string {
    return this.props.primaryColor;
  }

  public set secondaryColor(secondaryColor: string) {
    this.props.secondaryColor = secondaryColor;
  }

  public get secondaryColor(): string {
    return this.props.secondaryColor;
  }

  public set domain(domain: string) {
    this.props.domain = domain;
  }

  public get domain(): string {
    return this.props.domain;
  }

  public set planType(planType: string) {
    this.props.planType = planType;
  }

  public get planType(): string {
    return this.props.planType;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
