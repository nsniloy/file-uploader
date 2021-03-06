import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();
      return next.handle().pipe(
        tap((data) => {
          const requestDetails = {
            method: request.method,
            query_params: request.query,
            body: request.body,
            requested_endpoint: request.originalUrl,
            response_body: data,
            status: response.statusCode,
          };

          const logString =
            JSON.stringify(requestDetails) +
            '\n' +
            [request.method, request.originalUrl, response.statusCode].join(
              ' ',
            );

          Logger.log(logString, 'RequestLoggingInterceptor');
        }),
      );
    }
  }
}
