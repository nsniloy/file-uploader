import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../../../config/configuration';
import { GoogleFileStorageService } from '../services/google-file-storage.service';
import { LocalFileStorageService } from '../services/local-file-storage.service';

describe('LocalFileStorageService', () => {
  let service: LocalFileStorageService;
  let module: TestingModule
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
          cache: true,
        })
      ],
      providers: [LocalFileStorageService, ConfigService, GoogleFileStorageService],
    }).compile();

    service = module.get<LocalFileStorageService>(LocalFileStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service.convertToZip).toBeDefined();
  });

  it('should be defined', () => {
    expect(service.removeFiles).toBeDefined();
  });

  it('should be defined', () => {
    expect(service.saveFiles).toBeDefined();
  });
});
