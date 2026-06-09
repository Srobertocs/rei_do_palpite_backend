import { env } from 'prisma/config';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AuthRepository } from './auth.repository.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../strategies/local.strategy.js';
import { JwtStrategy } from '../../strategies/jwt.strategy.js';

@Module({
  imports: [
    PassportModule,

    JwtModule.register({
      secret: env('JWT_SECRETS'),
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
