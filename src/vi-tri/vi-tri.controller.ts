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
} from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ViTriDto } from './dto/vi-tri.dto';
import { ApiTags, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';

// Cấu hình lưu trữ cho Multer
const storage = diskStorage({
  destination: './uploads', // Thư mục lưu file
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix);
  },
});

@UseInterceptors(FileInterceptor('hinh_anh', { storage }))
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
  @Post('/upload-hinh-anh')
  @ApiConsumes('multipart/form-data') // Chỉ định kiểu form
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        hinh_anh: {
          type: 'string',
          format: 'binary', // Swagger hỗ trợ định dạng binary để mô tả file
        },
      },
    },
  })
  @ApiParam({
    name: 'ma_vi_tri',
    description: 'Mã vị trí cần tải lên hình ảnh',
    type: 'number',
  })
  @UseInterceptors(FileInterceptor('formFile', { storage }))
  async uploadImage(
    @Param('ma_vi_tri') ma_vi_tri: number,
    @UploadedFile() file: Multer.File,
  ) {
    return this.viTriService.uploadImage(ma_vi_tri, file);
  }
}
