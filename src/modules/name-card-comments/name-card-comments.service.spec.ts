import { Test, TestingModule } from '@nestjs/testing';
import { NameCardCommentsService } from './name-card-comments.service';

describe('NameCardCommentsService', () => {
  let service: NameCardCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NameCardCommentsService],
    }).compile();

    service = module.get<NameCardCommentsService>(NameCardCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
