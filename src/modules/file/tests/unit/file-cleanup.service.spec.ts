import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from '../../controllers/file.controller';
import { FileCleanupService, FileService } from '../../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from '../../repository/file.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalFileStorageService } from '../../../file-storage/services/local-file-storage.service';
import { GoogleFileStorageService } from '../../../file-storage/services/google-file-storage.service';
import { FileStorageModule } from '../../../file-storage/file-storage.module';
import configuration from '../../../../config/configuration';
import { MulterModule } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';

describe('AppController', () => {
  let app: TestingModule;
  let fileCleanupService: FileCleanupService;
  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([FileRepository]),
        FileStorageModule,
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
          cache: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            return configService.get('database');
          },
          inject: [ConfigService],
        }),
        MulterModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            let dest = configService.get('storageFolder')
            if (!existsSync(dest)) {
              mkdirSync(dest);
            }
            return {
              dest,
            }
          },
          inject: [ConfigService],
        }),],
      controllers: [FileController],
      providers: [
        FileService,
        FileCleanupService,
        ConfigService, 
        LocalFileStorageService, 
        GoogleFileStorageService
      ],
    }).compile();

    fileCleanupService = app.get<FileCleanupService>(FileCleanupService);
  });

  afterAll(async () => {
    await app.close();
  });


  describe('File cleanup', () => {
    it('should cleanup all the expired files', async () => {
      expect(fileCleanupService.cleanupFiles()).toEqual({})
    });
  });

});
