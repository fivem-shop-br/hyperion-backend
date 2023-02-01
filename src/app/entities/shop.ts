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
  primary_color?: string;
  secondary_color?: string;
  domain: string;
  plan_type: string;
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

  public set primary_color(primary_color: string) {
    this.props.primary_color = primary_color;
  }

  public get primary_color(): string {
    return this.props.primary_color;
  }

  public set secondary_color(secondary_color: string) {
    this.props.secondary_color = secondary_color;
  }

  public get secondary_color(): string {
    return this.props.secondary_color;
  }

  public set domain(domain: string) {
    this.props.domain = domain;
  }

  public get domain(): string {
    return this.props.domain;
  }

  public set plan_type(plan_type: string) {
    this.props.plan_type = plan_type;
  }

  public get plan_type(): string {
    return this.props.plan_type;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
