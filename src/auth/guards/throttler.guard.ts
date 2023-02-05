import { HttpStatus, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Error } from '../../utils/error.filter';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(res): void {
    const time = res.getResponse().getHeaders()['retry-after'];
    throw new Error({
      message: `Acesso bloqueado por ${time} segundos, muitas requisições.`,
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
    });
  }
}
