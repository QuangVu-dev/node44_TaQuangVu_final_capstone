import { Module } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { DatPhongController } from './dat-phong.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [DatPhongController],
  providers: [DatPhongService, PrismaClient],
  exports: [DatPhongService],
})
export class DatPhongModule {}
