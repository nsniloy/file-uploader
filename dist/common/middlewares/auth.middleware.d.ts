import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthMiddleware implements NestMiddleware {
    private configService;
    private auth_host;
    constructor(configService: ConfigService);
    use(req: any, res: Response, next: NextFunction): Promise<void>;
}
