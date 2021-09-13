import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from '../enums';

export class InvalidSecretKeyException extends UnauthorizedException {
  constructor() {
    super({ errorType: ErrorType.InvalidSecretKey });
  }
}
