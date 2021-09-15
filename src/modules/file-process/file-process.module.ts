import { Module } from '@nestjs/common';
import { GoogleFileProcessService } from './services/google-file-process.service';
import { LocalFileProcessService } from './services/local-file-process.service';

@Module({
  providers: [
    LocalFileProcessService,
    GoogleFileProcessService
  ],
  exports: [
    LocalFileProcessService,
    GoogleFileProcessService
  ]
})
export class FileProcessModule {}
