import { Test, TestingModule } from '@nestjs/testing';
import { ViTriController } from './vi-tri.controller';

describe('ViTriController', () => {
  let controller: ViTriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViTriController],
    }).compile();

    controller = module.get<ViTriController>(ViTriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
