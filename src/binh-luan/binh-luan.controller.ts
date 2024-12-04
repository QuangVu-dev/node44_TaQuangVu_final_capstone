import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { BinhLuanDto } from './dto/binh-luan.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('BinhLuan')
@Controller('api/binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: BinhLuanDto,
  })
  async create(@Body() binhLuanDto: BinhLuanDto) {
    return this.binhLuanService.createBinhLuan(binhLuanDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
  })
  async findAll() {
    return this.binhLuanService.getAllBinhLuan();
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: BinhLuanDto,
  })
  async update(@Param('id') id: number, @Body() binhLuanDto: BinhLuanDto) {
    return this.binhLuanService.updateBinhLuan(id, binhLuanDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: number) {
    return this.binhLuanService.deleteBinhLuan(id);
  }

  @Get('/lay-binh-luan-theo-ma-phong/:id')
  @ApiResponse({
    status: 200,
    type: BinhLuanDto,
  })
  async findOne(@Param('id') id: number) {
    return this.binhLuanService.getBinhLuanById(id);
  }
}
