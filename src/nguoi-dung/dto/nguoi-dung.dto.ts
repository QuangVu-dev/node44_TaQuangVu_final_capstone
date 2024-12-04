import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsDateString,
  IsBoolean,
  Min,
} from 'class-validator';

export class NguoiDungDto {
  @ApiProperty({ description: 'User ID (default is 0)', example: 0 })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({ description: 'Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsNotEmpty()
  @IsString()
  pass_word: string;

  @ApiProperty({ description: 'Phone number' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: 'Birthday' })
  @IsDateString()
  birth_day: string;

  @ApiProperty({ description: 'Gender' })
  @IsBoolean()
  gender: boolean;

  @ApiProperty({ description: 'Role' })
  @IsNotEmpty()
  @IsString()
  role: string;
}
