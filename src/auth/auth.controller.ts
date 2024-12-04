import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiBody({ type: RegisterDto }) // Định nghĩa DTO cho body
  async register(@Body() registerDto: RegisterDto) {
    const { id, name, email, pass_word, phone, birth_day, gender, role } =
      registerDto;
    return this.authService.register(
      id,
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
    );
  }

  @Post('/login')
  async login(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<Response<string>> {
    try {
      const result = await this.authService.login(body);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
