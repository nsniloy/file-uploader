import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FileService } from './';
@Injectable()
export class FileCleanupService {
  constructor(
    private fileService: FileService,
  ) {}

  @Cron('0 */6 * * *')
  cleanupFiles() {
    this.fileService.removeExpired();
    return {}
  }
}

