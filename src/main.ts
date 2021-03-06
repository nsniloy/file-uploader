import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { configSwagger } from '@config';
import { HttpExceptionFilter } from './common/exceptions';
import * as zip from 'express-easy-zip'
import {
  RequestLoggingInterceptor,
  ResponseTransformInterceptor,
} from './common/interceptors/http';
import { ConfigService } from '@nestjs/config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const prefix = configService.get<string>('api_prefix');

  app.use(helmet());
  app.use(compression());
  app.use(zip());
  app.enableCors();
  app.useGlobalFilters();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new ResponseTransformInterceptor(),
    new RequestLoggingInterceptor(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.setGlobalPrefix(prefix);
  configSwagger(app);
  await app.listen(port);
  return port;
};

bootstrap().then((port: number) => {
  Logger.log(`Application running on port: ${port}`, 'Main');
  // Sentry.init({
  //   dsn: process.env.SENTRY_DSN,
  //   environment: process.env.ENVIRONMENT
  // });
  // Sentry.configureScope(scope => {
  //   scope.setTag("service", 'jmc-erp')
  // });
});
