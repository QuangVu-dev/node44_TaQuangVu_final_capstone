import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { NguoiDungController } from './nguoi-dung/nguoi-dung.controller';
import { ViTriController } from './vi-tri/vi-tri.controller';
import { PhongController } from './phong/phong.controller';
import { DatPhongController } from './dat-phong/dat-phong.controller';
import { BinhLuanController } from './binh-luan/binh-luan.controller';
import { AuthModule } from './auth/auth.module';
import { BinhLuanService } from './binh-luan/binh-luan.service';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { DatPhongModule } from './dat-phong/dat-phong.module';
import { DatPhongService } from './dat-phong/dat-phong.service';
import { ViTriService } from './vi-tri/vi-tri.service';
import { ViTriModule } from './vi-tri/vi-tri.module';

@Module({
  imports: [AppModule, AuthModule, BinhLuanModule, DatPhongModule, ViTriModule],
  controllers: [
    AppController,
    AuthController,
    NguoiDungController,
    ViTriController,
    PhongController,
    DatPhongController,
    BinhLuanController,
  ],
  providers: [AppService, BinhLuanService, DatPhongService, ViTriService],
})
export class AppModule {}
