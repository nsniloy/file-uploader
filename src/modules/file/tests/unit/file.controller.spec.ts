import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from '../../controllers/file.controller';
import { FileService, FileCleanupService } from '../../services';
import { response } from 'express'
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
  let fileController: FileController;
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
        ConfigService, 
        LocalFileStorageService, 
        GoogleFileStorageService
      ],
    }).compile();

    fileController = app.get<FileController>(FileController);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('File download', () => {
    it('should be defined', async () => {
      expect(fileController.downloadByKey).toBeDefined()
    });
  });
  
  describe('File download', () => {
    it('should fail to download file', async () => {
      await expect(fileController.downloadByKey('0c365e38b13883ecaaa', response)).rejects.toThrow()
    });
  });

  describe('File delete', () => {
    it('should delete a set of files associated with a private key', async () => {
      expect(await fileController.remove('0c365e38b13883eca')).toEqual(
        {
          "message": "Files deleted successfully!!"
        }
      )
    });
  });
});
