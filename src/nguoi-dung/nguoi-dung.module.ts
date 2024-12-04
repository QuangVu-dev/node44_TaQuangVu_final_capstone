import { Module } from '@nestjs/common';
import { NguoiDungController } from './nguoi-dung.controller';
import { NguoiDungService } from './nguoi-dung.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [NguoiDungController],
  providers: [NguoiDungService, PrismaClient],
})
export class NguoiDungModule {}
