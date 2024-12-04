import { IsInt, IsNotEmpty, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DatPhongDto {
  @ApiProperty({ description: 'User ID (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({ description: 'Mã Phòng (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  ma_phong: number;

  @ApiProperty({ description: 'Ngày đến', example: '2024-12-04T15:08:09.852' })
  @IsDateString()
  @IsNotEmpty()
  ngay_den: string;

  @ApiProperty({ description: 'Ngày đi', example: '2024-12-04T15:08:09.852Z' })
  @IsDateString()
  @IsNotEmpty()
  ngay_di: string;

  @ApiProperty({ description: 'Số lượng khách (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  so_luong_khach: number;

  @ApiProperty({ description: 'Mã người đặt (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  ma_nguoi_dat: number;
}
