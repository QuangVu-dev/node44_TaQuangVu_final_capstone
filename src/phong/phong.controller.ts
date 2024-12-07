import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/phong.dto';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
// import { join } from 'path';

// Cấu hình lưu trữ cho Multer
const storage = diskStorage({
  // Chỉ định thư mục lưu trữ là public/uploads
  destination: (req, file, callback) => {
    const uploadDir = path.join(__dirname, '../../public/uploads'); // Đảm bảo sử dụng public/uploads
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Tạo thư mục nếu chưa tồn tại
    }
    callback(null, uploadDir); // Lưu vào thư mục public/uploads
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix); // Tạo tên file duy nhất
  },
});

@ApiTags('Phong') // Đánh dấu nhóm API này trong Swagger UI
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Post()
  @ApiBody({ type: CreatePhongDto })
  @ApiResponse({ status: 201 })
  async create(@Body() createPhongDto: CreatePhongDto) {
    return this.phongService.create(createPhongDto);
  }

  @Get()
  @ApiResponse({ status: 200 })
  async findAll() {
    return this.phongService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200 })
  async findOne(@Param('id') id: number) {
    return this.phongService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200 })
  async update(
    @Param('id') id: number,
    @Body() updatePhongDto: CreatePhongDto,
  ) {
    return this.phongService.update(id, updatePhongDto);
  }

  @Get('search/:tenPhong')
  @ApiResponse({ status: 200 })
  async search(@Param('ten_phong') ten_phong: string) {
    return this.phongService.searchByName(ten_phong);
  }

  // Xóa phòng
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.phongService.deletePhong(id);
  }

  // Upload hình ảnh cho phong
  @Post('/upload-hinh-phong/:id')
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
    name: 'id',
    type: 'number',
  })
  @UseInterceptors(FileInterceptor('hinh_anh', { storage }))
  async uploadImage(
    @Param('id') id: string, // nhận id dưới dạng chuỗi
    @UploadedFile() file: Express.Multer.File,
  ) {
    const numericId = parseInt(id, 10); // Chuyển id từ chuỗi sang số
    if (isNaN(numericId)) {
      throw new Error('Invalid id'); // Ném lỗi nếu không phải là số
    }

    return this.phongService.uploadImage(numericId, file);
  }
}
