import { HttpStatus, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Error } from 'src/utils/error.filter';
@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(res): void {
    const time = res.getResponse().getHeaders()['retry-after'];
    throw new Error({
      message: `Acesso bloqueado por ${time} segundos, muitas tentativas.`,
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
    });
  }
}
