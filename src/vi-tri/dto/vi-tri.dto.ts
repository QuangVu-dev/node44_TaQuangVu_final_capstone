import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  Min,
} from 'class-validator';

export class ViTriDto {
  @ApiProperty({ description: 'User ID (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({ description: 'Tên vị trí' })
  @IsNotEmpty()
  @IsString()
  ten_vi_tri: string;

  @ApiProperty({ description: 'Tên tỉnh thành' })
  @IsNotEmpty()
  @IsString()
  tinh_thanh: string;

  @ApiProperty({ description: 'Tên quốc gia' })
  @IsNotEmpty()
  @IsString()
  quoc_gia: string;

  @ApiProperty({ description: 'Hình ảnh' })
  @IsOptional()
  @IsString()
  @IsUrl()
  hinh_anh: string;
}
