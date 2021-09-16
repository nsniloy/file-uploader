import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './repository/file.repository';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter'
import { APP_GUARD } from '@nestjs/core';
import { FileCleanupService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileRepository]),
    RateLimiterModule.register(),
    FileStorageModule
  ],
  controllers: [FileController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
  },
    FileService,
    FileCleanupService
  ],
})
export class FileModule { }
