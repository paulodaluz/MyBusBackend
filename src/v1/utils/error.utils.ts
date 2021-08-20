import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorUtils {
  public static throwError(err: any): never {
    const status = err instanceof HttpException ? err.getStatus() : 500;

    ErrorUtils.throwSpecificError(status);
  }

  public static throwSpecificError(code: number): never {
    switch (code) {
      case 400:
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
      case 403:
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
      case 404:
        throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      case 504:
        throw new HttpException('TIMEOUT', HttpStatus.GATEWAY_TIMEOUT);
      default:
        throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
