import { Injectable } from '@nestjs/common';
import { CreatePhongDto } from './dto/phong.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PhongService {
  prisma = new PrismaClient();

  // Tạo mới phòng
  async create(createPhongDto: CreatePhongDto) {
    return this.prisma.phong.create({
      data: {
        id: createPhongDto.id,
        ten_phong: createPhongDto.ten_phong,
        khach: createPhongDto.khach,
        phong_ngu: createPhongDto.phong_ngu,
        giuong: createPhongDto.giuong,
        phong_tam: createPhongDto.phong_tam,
        mo_ta: createPhongDto.mo_ta,
        gia_tien: createPhongDto.gia_tien,
        may_giat: createPhongDto.may_giat,
        ban_la: createPhongDto.ban_la,
        tivi: createPhongDto.tivi,
        dieu_hoa: createPhongDto.dieu_hoa,
        wifi: createPhongDto.wifi,
        bep: createPhongDto.bep,
        do_xe: createPhongDto.do_xe,
        ho_boi: createPhongDto.ho_boi,
        ban_ui: createPhongDto.ban_ui,
        hinh_anh: createPhongDto.hinh_anh || '', // Nếu không có ảnh, truyền giá trị mặc định
      },
    });
  }

  // Cập nhật phòng theo ID
  async update(id: number, updatePhongDto: CreatePhongDto) {
    return this.prisma.phong.update({
      where: { id },
      data: updatePhongDto,
    });
  }

  // Lấy thông tin phòng theo ID
  async findOne(id: number) {
    return this.prisma.phong.findUnique({
      where: { id },
    });
  }

  // Lấy tất cả các phòng
  async findAll() {
    return this.prisma.phong.findMany();
  }

  // Tìm kiếm phòng theo tên
  async searchByName(ten_phong: string) {
    return this.prisma.phong.findMany({
      where: {
        ten_phong: {
          contains: ten_phong, // Tìm kiếm theo tên phòng
        },
      },
    });
  }

  // Xóa phòng
  async deletePhong(id: number) {
    return this.prisma.phong.delete({
      where: { id: id },
    });
  }
}
