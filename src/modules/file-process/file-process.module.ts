import { Module } from '@nestjs/common';
import { GoogleFileAccessService } from './services/google-file-process.service';
import { LocalFileAccessService } from './services/local-file-process.service';

@Module({
  providers: [
    LocalFileAccessService,
    GoogleFileAccessService
  ],
  exports: [
    LocalFileAccessService,
    GoogleFileAccessService
  ]
})
export class FileAccessModule {}
