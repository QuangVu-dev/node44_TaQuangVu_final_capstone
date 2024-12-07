import { Injectable } from '@nestjs/common';
import { PrismaClient, ViTri } from '@prisma/client';
import { ViTriDto } from './dto/vi-tri.dto';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import { join } from 'path';
import { Express } from 'express';

const renameAsync = util.promisify(fs.rename);

@Injectable()
export class ViTriService {
  prisma = new PrismaClient();

  // Lấy tất cả các vị trí
  async getAllViTri(): Promise<ViTri[]> {
    return this.prisma.viTri.findMany();
  }

  // Lấy vị trí theo ID
  async getViTriById(id: number): Promise<ViTri> {
    return this.prisma.viTri.findUnique({
      where: { id },
    });
  }

  // Tạo mới một vị trí
  async createViTri(ViTriDto: ViTriDto): Promise<ViTri> {
    return this.prisma.viTri.create({
      data: {
        id: ViTriDto.id,
        ten_vi_tri: ViTriDto.ten_vi_tri,
        tinh_thanh: ViTriDto.tinh_thanh,
        quoc_gia: ViTriDto.quoc_gia,
        hinh_anh: ViTriDto.hinh_anh || '', // Nếu không có hình ảnh, truyền giá trị mặc định
      },
    });
  }

  // Cập nhật một vị trí theo ID
  async updateViTri(id: number, updateViTriDto: ViTriDto): Promise<ViTri> {
    return this.prisma.viTri.update({
      where: { id: Number(id) },
      data: {
        ...updateViTriDto,
        quoc_gia: updateViTriDto.quoc_gia, // Sử dụng toán tử spread để truyền dữ liệu
      },
    });
  }

  // Xóa một vị trí theo ID
  async deleteViTri(id: number): Promise<ViTri> {
    try {
      return await this.prisma.viTri.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      throw new Error(
        `Unable to delete record with id ${id}: ${error.message}`,
      );
    }
  }

  // Upload hình ảnh cho vị trí
  async uploadImage(id: number, file: Express.Multer.File): Promise<ViTri> {
    // Kiểm tra xem file có hợp lệ không
    if (!file) {
      throw new Error('No file uploaded');
    }

    const fileExtension = path.extname(file.originalname);
    const fileName = `${id}-${Date.now()}${fileExtension}`;

    // Lưu trữ file vào thư mục public/uploads (bạn có thể thay đổi đường dẫn theo ý muốn)
    const filePath = join(__dirname, '../../public/uploads', fileName);
    await renameAsync(file.path, filePath); // Di chuyển file từ thư mục temp đến đích

    // Cập nhật đường dẫn hình ảnh vào cơ sở dữ liệu
    const updatedViTri = await this.prisma.viTri.update({
      where: { id: Number(id) },
      data: { hinh_anh: filePath },
    });

    return updatedViTri;
  }
}
