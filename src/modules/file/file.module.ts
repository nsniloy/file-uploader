import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './repository/file.repository';
import { FileProcessModule } from '@modules/file-process/file-process.module';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter'
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileRepository]),
    RateLimiterModule.register(),
    FileProcessModule
  ],
  controllers: [FileController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
  },
    FileService
  ],
})
export class FileModule { }
