import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePhongDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ten_phong: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  khach: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  phong_ngu: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  giuong: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  phong_tam: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mo_ta: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  gia_tien: number;

  @ApiProperty()
  @IsBoolean()
  may_giat: boolean;

  @ApiProperty()
  @IsBoolean()
  ban_la: boolean;

  @ApiProperty()
  @IsBoolean()
  tivi: boolean;

  @ApiProperty()
  @IsBoolean()
  dieu_hoa: boolean;

  @ApiProperty()
  @IsBoolean()
  wifi: boolean;

  @ApiProperty()
  @IsBoolean()
  bep: boolean;

  @ApiProperty()
  @IsBoolean()
  do_xe: boolean;

  @ApiProperty()
  @IsBoolean()
  ho_boi: boolean;

  @ApiProperty()
  @IsBoolean()
  ban_ui: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  hinh_anh: string;
}
