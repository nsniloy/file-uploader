import { Module } from '@nestjs/common';
import { GoogleFileStorageService } from './services/google-file-storage.service';
import { LocalFileStorageService } from './services/local-file-storage.service';

@Module({
  providers: [
    LocalFileStorageService,
    GoogleFileStorageService
  ],
  exports: [
    LocalFileStorageService,
    GoogleFileStorageService
  ]
})
export class FileStorageModule {}
