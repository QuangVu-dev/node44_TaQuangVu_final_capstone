import { Test, TestingModule } from '@nestjs/testing';
import { BinhLuanController } from './binh-luan.controller';

describe('BinhLuanController', () => {
  let controller: BinhLuanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BinhLuanController],
    }).compile();

    controller = module.get<BinhLuanController>(BinhLuanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
