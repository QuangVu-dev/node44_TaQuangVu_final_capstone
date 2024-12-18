import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungDto } from './dto/nguoi-dung.dto';
import { NguoiDung } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  // Tạo mới người dùng
  @Post()
  async create(@Body() NguoiDungDto: NguoiDungDto): Promise<NguoiDung> {
    return this.nguoiDungService.create(NguoiDungDto);
  }

  // Lấy danh sách tất cả người dùng
  @Get()
  async findAll(): Promise<NguoiDung[]> {
    return this.nguoiDungService.findAll();
  }

  // Lấy người dùng theo ID
  @Get(':id')
  async findById(@Param('id') id: number): Promise<NguoiDung | null> {
    return this.nguoiDungService.findById(id);
  }

  // Cập nhật người dùng
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateNguoiDungDto: NguoiDungDto,
  ): Promise<NguoiDung> {
    return this.nguoiDungService.update(id, updateNguoiDungDto);
  }

  // Xóa người dùng
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<NguoiDung> {
    return this.nguoiDungService.remove(id);
  }

  // Phương thức GET: Tìm kiếm người dùng theo tên
  @Get('search/:tenNguoiDung')
  async search(@Param('tenNguoiDung') tenNguoiDung: string) {
    return this.nguoiDungService.searchByName(tenNguoiDung);
  }

  // Phương thức POST: Upload ảnh người dùng
  @Post('upload-avatar/:id') // Bao gồm id trong route
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload avatar for the user',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiParam({ name: 'id', type: 'number' })
  async uploadAvatar(
    @Param('id') id: string, // Nhận id là string từ URL
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.nguoiDungService.uploadAvatar(numericId, file);
  }
}
