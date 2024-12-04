import { Module } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { BinhLuanController } from './binh-luan.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [BinhLuanController],
  providers: [BinhLuanService, PrismaClient],
})
export class BinhLuanModule {}
