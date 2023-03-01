import { randomUUID } from 'node:crypto';
import { Replace } from '../../helpers/Replace';
import { hashSync } from 'bcrypt';

export interface UserProps {
  id: string;
  email: string;
  password?: string;
  name: string;
  emailVerified?: boolean;
  image?: string;
  role?: string[];
  createdAt?: Date;
  updatedAt?: Date;
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
      email: props.email.toLowerCase(),
      password: props.password && hashSync(props.password, 10),
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

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
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

  public set role(role: string[]) {
    this.props.role = role;
  }

  public get role(): string[] {
    return this.props.role;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
