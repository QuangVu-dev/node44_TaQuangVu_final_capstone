import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ViTriDto } from './dto/vi-tri.dto';
import { ApiTags, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

// Cấu hình lưu trữ cho Multer
const storage = diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
    }
    console.log('Saving to:', uploadDir); // Log đường dẫn thư mục
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix); // Tạo tên file duy nhất
  },
});

@ApiTags('ViTri')
@Controller('api/vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}

  // Lấy tất cả các vị trí
  @Get()
  async getAllViTri() {
    return this.viTriService.getAllViTri();
  }

  // Lấy vị trí theo ID
  @Get(':id')
  async getViTriById(@Param('id') id: number) {
    return this.viTriService.getViTriById(id);
  }

  // Tạo mới một vị trí
  @Post()
  async createViTri(@Body() ViTriDto: ViTriDto) {
    return this.viTriService.createViTri(ViTriDto);
  }

  // Cập nhật một vị trí theo ID
  @Put(':id')
  async updateViTri(@Param('id') id: number, @Body() updateViTriDto: ViTriDto) {
    return this.viTriService.updateViTri(id, updateViTriDto);
  }

  // Xóa một vị trí theo ID
  @Delete(':id')
  async deleteViTri(@Param('id') id: number) {
    return this.viTriService.deleteViTri(id);
  }

  // Upload hình ảnh cho vị trí
  @Post('/upload-hinh-anh/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        hinh_anh: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @UseInterceptors(
    FileInterceptor('hinh_anh', {
      storage,
      limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
    }),
  )
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid id');
    }

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.viTriService.uploadImage(numericId, file);
  }
}
