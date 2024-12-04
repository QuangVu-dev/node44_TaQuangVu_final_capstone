import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatPhongDto } from './dto/dat-phong.dto';

@Injectable()
export class DatPhongService {
  prisma = new PrismaClient();

  // Tạo mới đặt phòng
  async createDatPhong(datPhongDto: DatPhongDto) {
    const { id, ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat } =
      datPhongDto;
    const newDatPhong = await this.prisma.datPhong.create({
      data: {
        id,
        ma_phong,
        ngay_den: new Date(ngay_den),
        ngay_di: new Date(ngay_di),
        so_luong_khach,
        ma_nguoi_dat,
      },
    });
    return newDatPhong;
  }

  // Lấy tất cả đặt phòng
  async getAllDatPhong() {
    return this.prisma.datPhong.findMany();
  }

  // Lấy đặt phòng theo ID
  async getDatPhongById(id: number) {
    return this.prisma.datPhong.findUnique({
      where: { id },
    });
  }

  // Cập nhật đặt phòng
  async updateDatPhong(id: number, datPhongDto: DatPhongDto) {
    return this.prisma.datPhong.update({
      where: { id },
      data: datPhongDto,
    });
  }

  // Xóa đặt phòng
  async deleteDatPhong(id: number) {
    return this.prisma.datPhong.delete({
      where: { id },
    });
  }

  // Lấy danh sách đặt phòng theo mã người dùng
  async getDatPhongByUserId(ma_nguoi_dat: number) {
    return this.prisma.datPhong.findMany({
      where: {
        ma_nguoi_dat,
      },
    });
  }
}
