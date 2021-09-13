import { UnauthorizedException } from '@nestjs/common';
import { ErrorType } from '../enums';

export class InvalidPermissionExeption extends UnauthorizedException {
  constructor() {
    super({
      errorType: ErrorType.FailedAuthorization,
      message: 'You do not have access to this action',
    });
  }
}
