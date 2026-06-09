import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service.js';
import { Prisma } from '@prisma/client';
@Injectable()
export class AuthRepository {
  private readonly prismaService = PrismaService;

  searchUser(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }
}
