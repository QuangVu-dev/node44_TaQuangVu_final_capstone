import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [PhongController],
  providers: [PhongService, PrismaClient],
})
export class PhongModule {}
