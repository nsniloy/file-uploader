import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from '../enums';

export class FailedAuthorizationException extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.FailedAuthorization,
      message: 'Failed to check authorization',
    });
  }
}
