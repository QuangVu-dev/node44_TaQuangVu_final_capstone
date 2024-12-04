import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'User ID (default is 0)', example: 0 })
  @IsOptional()
  @IsNumber()
  id?: number = 0; // Giá trị mặc định là 0

  @ApiProperty({ description: 'Full name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the account' })
  @IsString()
  pass_word: string;

  @ApiProperty({ description: 'Phone number' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Birthday in ISO format', required: false })
  @IsOptional()
  @IsDateString()
  birth_day: string;

  @ApiProperty({ description: 'Gender of the user' })
  @IsBoolean()
  gender: boolean;

  @ApiProperty({ description: 'Role of the user' })
  @IsString()
  role: string;
}
