import { Test, TestingModule } from '@nestjs/testing';
import { DatPhongController } from './dat-phong.controller';

describe('DatPhongController', () => {
  let controller: DatPhongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatPhongController],
    }).compile();

    controller = module.get<DatPhongController>(DatPhongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
