import { Injectable } from '@nestjs/common';
import { CreatePhongDto } from './dto/phong.dto';
import { Phong, PrismaClient } from '@prisma/client';
import { join } from 'path';
import * as path from 'path';
import * as util from 'util';
import * as fs from 'fs';

const renameAsync = util.promisify(fs.rename);

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
      where: { id: Number(id) },
      data: updatePhongDto,
    });
  }

  // Lấy thông tin phòng theo ID
  async findOne(id: number) {
    return this.prisma.phong.findUnique({
      where: { id: Number(id) },
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
      where: { id: Number(id) },
    });
  }

  // Upload hình ảnh cho phong
  async uploadImage(id: any, file: Express.Multer.File): Promise<Phong> {
    const parsedId = parseInt(id, 10); // Ép kiểu id thành number
    if (isNaN(parsedId)) {
      throw new Error('Invalid id');
    }

    // Kiểm tra file
    if (!file) {
      throw new Error('No file uploaded');
    }

    const fileExtension = path.extname(file.originalname);
    const fileName = `${parsedId}-${Date.now()}${fileExtension}`;

    // Kiểm tra tên file
    console.log('File Name:', fileName);

    // Lưu trữ file vào thư mục public/uploads
    const filePath = join(__dirname, '../../public/uploads', fileName);
    await renameAsync(file.path, filePath);

    // Cập nhật đường dẫn hình ảnh vào cơ sở dữ liệu
    const updatedPhong = await this.prisma.phong.update({
      where: { id: parsedId }, // Sử dụng parsedId để cập nhật
      data: { hinh_anh: filePath },
    });

    return updatedPhong;
  }
}
