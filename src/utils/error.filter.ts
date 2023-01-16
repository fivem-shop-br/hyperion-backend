import { HttpException, HttpCode } from '@nestjs/common';
import type { HttpStatus as propsHttpStatus } from '@nestjs/common';

interface ErrorProps {
  message: string[];
  statusCode: propsHttpStatus;
}

export class Error extends HttpException {
  constructor({ message, statusCode }: ErrorProps) {
    super({ statusCode, message }, statusCode);
  }
}
