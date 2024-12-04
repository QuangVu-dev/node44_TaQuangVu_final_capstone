import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BinhLuanDto } from './dto/binh-luan.dto';

@Injectable()
export class BinhLuanService {
  prisma = new PrismaClient();

  // Tạo bình luận mới
  async createBinhLuan(binhLuanDto: BinhLuanDto) {
    const {
      id,
      ma_phong,
      ma_nguoi_binh_luan,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
    } = binhLuanDto;
    const newBinhLuan = await this.prisma.binhLuan.create({
      data: {
        id: id === 0 ? undefined : id,
        ma_phong,
        ma_nguoi_binh_luan,
        ngay_binh_luan: new Date(ngay_binh_luan),
        noi_dung,
        sao_binh_luan,
      },
    });
    return newBinhLuan;
  }

  // Lấy tất cả bình luận
  async getAllBinhLuan() {
    return this.prisma.binhLuan.findMany();
  }

  // Lấy bình luận theo ID
  async getBinhLuanById(id: number) {
    return this.prisma.binhLuan.findUnique({
      where: { id },
    });
  }

  // Cập nhật bình luận
  async updateBinhLuan(id: number, binhLuanDto: BinhLuanDto) {
    return this.prisma.binhLuan.update({
      where: { id },
      data: binhLuanDto,
    });
  }

  // Xóa bình luận
  async deleteBinhLuan(id: number) {
    return this.prisma.binhLuan.delete({
      where: { id },
    });
  }
}
