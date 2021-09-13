import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretKeyMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['secret-key']) {
      if (req.headers['secret-key'] != this.configService.get('secret_key')) {
        throw new HttpException(
          { message: 'Invalid Secret Key' },
          HttpStatus.UNAUTHORIZED,
        );
      }
      next();
    } else {
      throw new HttpException(
        { message: 'Invalid Secret Key' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
