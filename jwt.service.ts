import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Đọc các file khóa từ thư mục dự án
let accessTokenPrivateKey = fs.readFileSync('access_token.private.key');
let accessTokenPublicKey = fs.readFileSync('access_token.public.key');
let refreshTokenPrivateKey = fs.readFileSync('refresh_token.private.key');
let refreshTokenPublicKey = fs.readFileSync('refresh_token.public.key');

// Đọc file .env
dotenv.config();

@Injectable()
export class JwtService {
  // Tạo access token với key HMAC
  createToken(data: any): string {
    return jwt.sign({ payload: data }, process.env.ACCESS_TOKEN_KEY, {
      algorithm: 'HS256',
      expiresIn: '7d',
    });
  }

  // Tạo access token với key RSA
  createTokenAsyncKey(data: any): string {
    return jwt.sign({ payload: data }, accessTokenPrivateKey, {
      algorithm: 'RS256',
      expiresIn: '10s',
    });
  }

  // Tạo refresh token với key HMAC
  createRefToken(data: any): string {
    return jwt.sign({ payload: data }, process.env.REFRESH_SECRET, {
      algorithm: 'HS256',
      expiresIn: '7d',
    });
  }

  // Tạo refresh token với key RSA
  createRefTokenAsyncKey(data: any): string {
    return jwt.sign({ payload: data }, refreshTokenPrivateKey, {
      algorithm: 'RS256',
      expiresIn: '7d',
    });
  }

  // Kiểm tra tính hợp lệ của token với key HMAC
  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Kiểm tra tính hợp lệ của token với key RSA
  verifyTokenAsyncKey(token: string): boolean {
    try {
      jwt.verify(token, accessTokenPublicKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}
