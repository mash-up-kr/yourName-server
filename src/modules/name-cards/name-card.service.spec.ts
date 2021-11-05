import { Test, TestingModule } from '@nestjs/testing';
import { NameCardService } from './name-card.service';

describe('NameCardService', () => {
  let service: NameCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NameCardService],
    }).compile();

    service = module.get<NameCardService>(NameCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
