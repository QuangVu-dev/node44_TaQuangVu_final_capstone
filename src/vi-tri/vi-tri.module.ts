import { Module } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ViTriController } from './vi-tri.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [ViTriController],
  providers: [ViTriService, PrismaClient],
})
export class ViTriModule {}
