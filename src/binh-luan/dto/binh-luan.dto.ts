import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsDateString,
  Min,
} from 'class-validator';

export class BinhLuanDto {
  @ApiProperty({ description: 'User ID (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({ description: 'Mã phòng (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  ma_phong: number;

  @ApiProperty({ description: 'Mã người bình luận (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  ma_nguoi_binh_luan: number;

  @ApiProperty({ description: 'Ngày bình luận' })
  @IsDateString()
  @IsNotEmpty()
  ngay_binh_luan: string;

  @ApiProperty({ description: 'Nội dung' })
  @IsString()
  @IsNotEmpty()
  noi_dung: string;

  @ApiProperty({ description: 'Sao bình luận (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  sao_binh_luan: number;
}
