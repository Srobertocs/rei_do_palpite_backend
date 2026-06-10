import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service.js';
import { SearchPaymentMethodDto } from '../../dtos/payment.method/search-payment-method.dto.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentMethodRepository {
  private readonly prismaService = PrismaService;

  searchPaymentMethod(data: SearchPaymentMethodDto) {
    return this.prismaService.paymentMethod.findFirst({
      where: { ...data },
    });
  }
  create(data: Prisma.PaymentMethodCreateInput) {
    return this.prismaService.paymentMethod.create({ data });
  }

  findAll(userId: number) {
    return this.prismaService.paymentMethod.findMany({
      where: { user_id: userId },
    });
  }

  delete(id: number) {
    return this.prismaService.paymentMethod.delete({
      where: { id },
    });
  }
}
