import { Test, TestingModule } from '@nestjs/testing';
import { LocalFileAccessService } from './local-file-process.service';

describe('LocalFileAccessService', () => {
  let service: LocalFileAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalFileAccessService],
    }).compile();

    service = module.get<LocalFileAccessService>(LocalFileAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
