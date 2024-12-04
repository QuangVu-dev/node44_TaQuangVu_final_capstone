import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { KeyService } from '../key/key.service';
import { LoginDto } from './dto/login.dto'; // Import LoginDto

@Injectable()
export class AuthService {
  prisma = new PrismaClient();
  constructor(
    private jwtService: JwtService,
    // private configService: ConfigService,
    private keyService: KeyService,
  ) {}

  // Đăng ký người dùng (không thay đổi gì ở đây)
  async register(
    id: number | undefined,
    name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: string,
  ) {
    const userExist = await this.prisma.nguoiDung.findFirst({
      where: { email },
    });

    if (userExist) {
      throw new Error('Tài khoản đã tồn tại');
    }

    const newUser = await this.prisma.nguoiDung.create({
      data: {
        id: id === 0 ? undefined : id,
        name,
        email,
        pass_word,
        phone,
        birth_day: isNaN(new Date(birth_day).getTime())
          ? null
          : new Date(birth_day),
        gender,
        role,
      },
    });

    return newUser;
  }

  // Đăng nhập người dùng, sử dụng DTO LoginDto
  async login(body: LoginDto): Promise<string> {
    try {
      const { email, pass_word } = body;
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: { email },
      });
      if (!checkUser) {
        throw new BadRequestException('Email is wrong');
      }
      const checkPass = checkUser.pass_word === pass_word;
      if (!checkPass) {
        throw new BadRequestException('Password is wrong');
      }

      const token = this.jwtService.sign(
        { data: { userId: checkUser.id } },
        {
          expiresIn: '30m',
          // secret: this.configService.get<string>('SECRET_KEY')
          privateKey: this.keyService.getPrivateKey(),
          algorithm: 'RS256',
        },
      );
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
}
