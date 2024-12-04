import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { KeyModule } from '../key/key.module';
import { KeyService } from '../key/key.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [KeyModule],
      inject: [KeyService],
      useFactory: async (keyService: KeyService) => ({
        privateKey: keyService.getPrivateKey(),
        signOptions: { expiresIn: '1h', algorithm: 'RS256' },
      }),
    }),
    KeyModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaClient],
  exports: [AuthService],
})
export class AuthModule {}
