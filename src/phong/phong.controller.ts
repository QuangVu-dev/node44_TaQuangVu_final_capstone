import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/phong.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
