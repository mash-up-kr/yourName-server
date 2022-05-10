import { Test, TestingModule } from '@nestjs/testing';
import { NameCardCommentsController } from './name-card-comments.controller';
import { NameCardCommentsService } from './name-card-comments.service';

describe('NameCardCommentsController', () => {
  let controller: NameCardCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NameCardCommentsController],
      providers: [NameCardCommentsService],
    }).compile();

    controller = module.get<NameCardCommentsController>(NameCardCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
