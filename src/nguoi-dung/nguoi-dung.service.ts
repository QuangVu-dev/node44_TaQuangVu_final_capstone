import { Injectable } from '@nestjs/common';
import { PrismaClient, NguoiDung } from '@prisma/client';
import { NguoiDungDto } from './dto/nguoi-dung.dto';
import { Express } from 'express';

@Injectable()
export class NguoiDungService {
  prisma = new PrismaClient();

  // Tạo mới người dùng
  async create(NguoiDungDto: NguoiDungDto): Promise<NguoiDung> {
    const { id, name, email, pass_word, phone, birth_day, gender, role } =
      NguoiDungDto;

    const newUser = await this.prisma.nguoiDung.create({
      data: {
        id,
        name,
        email,
        pass_word,
        phone,
        birth_day: new Date(birth_day),
        gender,
        role,
      },
    });
    return newUser;
  }

  // Lấy danh sách người dùng
  async findAll(): Promise<NguoiDung[]> {
    return this.prisma.nguoiDung.findMany();
  }

  // Lấy người dùng theo ID
  async findById(id: number): Promise<NguoiDung | null> {
    return this.prisma.nguoiDung.findUnique({
      where: { id: Number(id) },
    });
  }

  // Cập nhật người dùng
  async update(
    id: number,
    updateNguoiDungDto: NguoiDungDto,
  ): Promise<NguoiDung> {
    return this.prisma.nguoiDung.update({
      where: { id: Number(id) },
      data: updateNguoiDungDto,
    });
  }

  // Xóa người dùng
  async remove(id: number): Promise<NguoiDung> {
    return this.prisma.nguoiDung.delete({
      where: { id: Number(id) },
    });
  }

  // Phương thức tìm kiếm người dùng theo tên
  async searchByName(tenNguoiDung: string) {
    const results = await this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: tenNguoiDung.toLowerCase(),
        },
      },
    });

    if (results.length === 0) {
      throw new Error('No users found with the given name.');
    }

    return results;
  }

  // Phương thức upload ảnh người dùng
  async uploadAvatar(id: number, file: Express.Multer.File) {
    const avatarPath = `./public/uploads/avatars/${file.filename}`; // Lưu trữ ảnh vào thư mục này

    // Cập nhật ảnh đại diện của người dùng
    return this.prisma.nguoiDung.update({
      where: { id: id },
      data: {
        avatar: avatarPath, // Cập nhật trường avatar trong cơ sở dữ liệu
      },
    });
  }
}
