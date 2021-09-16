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
import { IFile } from '../../entities/definitions/file.interface';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let app: TestingModule;
  let fileService: FileService;
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

    fileService = app.get<FileService>(FileService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Fetch file', () => {
    it('should fail to fetch files', async () => {            
      await expect(fileService.findByKey('0c365e38b13883ecaaa')).rejects.toThrow()
    });
  });

  describe('Fetch file', () => {
    it('should fetch files associated with a specific public key', async () => {      
      let data = await fileService.findByKey('0c365e38b13883ec')
      expect(data[0]).toHaveProperty('id')
      expect(data[0]).toHaveProperty('name')
      expect(data[0]).toHaveProperty('location')
    });
  });

  describe('Remove file', () => {
    it('should remove files associated with a specific private key', async () => {
      expect(await fileService.remove('0c365e38b13883ec')).toEqual({})
    });
  });

  describe('Remove old files', () => {
    it('should remove oll the expired files', async () => {
      expect(await fileService.removeExpired()).toEqual({})
    });
  });

  describe('Generate key', () => {
    it('should return a pair of public and private keys', async () => {      
      let data = fileService.generateKeys()
      expect(data).toHaveProperty('privateKey')
      expect(data).toHaveProperty('publicKey')
    });
  });
});
