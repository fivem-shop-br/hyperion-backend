import { HttpException } from '@nestjs/common';
import type { HttpStatus as propsHttpStatus } from '@nestjs/common';

interface ErrorProps {
  message: string | unknown;
  statusCode: propsHttpStatus;
}

export class Error extends HttpException {
  constructor({ message, statusCode }: ErrorProps) {
    super({ statusCode, message }, statusCode);
  }
}
