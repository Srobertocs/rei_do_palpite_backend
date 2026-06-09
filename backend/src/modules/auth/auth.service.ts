import 'dotenv/config';
import { Injectable, ConflictException } from '@nestjs/common';
import { AuthRepository } from './auth.repository.js';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RegisterDto } from '../../dtos/register.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        tel: user.tel,
        status: user.status,
        user_type: user.user_type,
      },
    };
  }

  async registerUser(data: RegisterDto) {
    const user = await this.authRepository.searchUser(data.email);

    if (user) {
      throw new ConflictException('Usuário já existe');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const userDataToCreate = {
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      tel: data.tel,
      user_type: data.user_type,
      status: data.status,
      passwordHash,
    };

    const userCreate = await this.authRepository.createUser(userDataToCreate);

    return this.generateToken(userCreate);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.authRepository.searchUser(email);

    if (
      user &&
      user.passwordHash &&
      (await bcrypt.compare(password, user.passwordHash))
    ) {
      return user;
    }
    return null;
  }
}
