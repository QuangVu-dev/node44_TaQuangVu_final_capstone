import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { DatPhongDto } from './dto/dat-phong.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('DatPhong')
@Controller('api/dat-phong')
export class DatPhongController {
  constructor(private readonly datPhongService: DatPhongService) {}

  @Post()
  @ApiResponse({ status: 201, type: DatPhongDto })
  async create(@Body() datPhongDto: DatPhongDto) {
    return this.datPhongService.createDatPhong(datPhongDto);
  }

  @Get()
  @ApiResponse({ status: 200 })
  async findAll() {
    return this.datPhongService.getAllDatPhong();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: DatPhongDto })
  async findOne(@Param('id') id: number) {
    return this.datPhongService.getDatPhongById(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: DatPhongDto })
  async update(@Param('id') id: number, @Body() datPhongDto: DatPhongDto) {
    return this.datPhongService.updateDatPhong(id, datPhongDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: number) {
    return this.datPhongService.deleteDatPhong(id);
  }

  @Get('/lay-theo-nguoi-dat/:ma_nguoi_dat')
  @ApiResponse({ status: 200, type: [DatPhongDto] })
  async findByUserId(@Param('ma_nguoi_dat') ma_nguoi_dat: number) {
    return this.datPhongService.getDatPhongByUserId(ma_nguoi_dat);
  }
}
