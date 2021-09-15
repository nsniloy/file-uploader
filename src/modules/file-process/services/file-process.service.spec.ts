import { Test, TestingModule } from '@nestjs/testing';
import { LocalFileProcessService } from './local-file-process.service';

describe('LocalFileProcessService', () => {
  let service: LocalFileProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalFileProcessService],
    }).compile();

    service = module.get<LocalFileProcessService>(LocalFileProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
