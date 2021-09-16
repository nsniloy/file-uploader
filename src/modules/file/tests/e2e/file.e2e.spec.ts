import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { FileStorageModule } from '../../../file-storage/file-storage.module';
import { GoogleFileStorageService } from '../../../file-storage/services/google-file-storage.service';
import { LocalFileStorageService } from '../../../file-storage/services/local-file-storage.service';
import { FileController } from '../../../file/controllers';
import { FileRepository } from '../../../file/repository/file.repository';
import { FileService } from '../../../file/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'fs';
import configuration from '../../../../config/configuration';

describe('Files', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('returns 400', async () => {
    const response = await request(app.getHttpServer())
      .get('/files/0c365e38b13883eca')
      .expect(400)
  })

  it('returns 200', async () => {
    const response = await request(app.getHttpServer())
      .get('/files/0c365e38b13883ec')
      .expect(200)
  })

  it('returns 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/files')
      .attach('files','package.json')
      .expect(201)
  })

  it('returns 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/files')
      .attach('attacments','package.json')
      .expect(400)
  })

  it('returns 200', async () => {
    const response = await request(app.getHttpServer())
      .delete('/files/0c365e38b13883ec')
      .expect(200)
  })

  it('returns 200', async () => {
    const response = await request(app.getHttpServer())
      .delete('/files/any-public-key')
      .expect(200)
  })

  afterAll(async () => {
    await app.close();
  });
});