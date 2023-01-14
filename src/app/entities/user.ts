import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/Replace';

export interface UserProps {
  id: string;
  email: string;
  password: string;
  name: string;
  emailVerified?: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>,
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

  public set userId(userId: string) {
    this.props.id = userId;
  }

  public get userId(): string {
    return this.props.id;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set emailVerified(emailVerified: boolean) {
    this.props.emailVerified = emailVerified;
  }

  public get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  public set image(image: string) {
    this.props.image = image;
  }

  public get image(): string {
    return this.props.image;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
