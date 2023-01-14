import { HttpException } from '@nestjs/common';
import type { HttpStatus as propsHttpStatus } from '@nestjs/common';

interface ErrorProps {
  error: {
    message: string;
  };
  statusCode: propsHttpStatus;
}

export class Error extends HttpException {
  constructor({ error, statusCode }: ErrorProps) {
    super(error.message, statusCode);
  }
}
