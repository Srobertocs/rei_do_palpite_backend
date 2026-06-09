import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { User } from '@prisma/client';
import { RegisterDto } from '../../dtos/register.dto.js';
import { LoginDto } from '../../dtos/login.dto.js';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.authService.registerUser(body);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseGuards(AuthGuard('local'))
  loginUser(@Req() req: Request & { user: User }) {
    return this.authService.generateToken(req.user);
  }
}
