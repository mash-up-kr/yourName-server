import { Test, TestingModule } from '@nestjs/testing';
import { NameCardController } from './name-card.controller';
import { NameCardService } from './name-card.service';

describe('NameCardController', () => {
  let controller: NameCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NameCardController],
      providers: [NameCardService],
    }).compile();

    controller = module.get<NameCardController>(NameCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
