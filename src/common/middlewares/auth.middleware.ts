import { HttpException } from '@nestjs/common/exceptions/http.exception';
import {
  NestMiddleware,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import Any = jasmine.Any;
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private auth_host: string;
  constructor(private configService: ConfigService) {
    this.auth_host = this.configService.get('auth_host');
  }
  async use(req: any, res: Response, next: NextFunction) {
    if (!req.headers['authorization'])
      throw new UnauthorizedException('Access denied. No token provided!');

    const token = req.headers['authorization'].split(' ')[1];
    try {
      let user: any;
      req.user = user;
      next();
    } catch (ex) {}
  }
}
