import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderRepository {
  private readonly prismaService = PrismaService;

  findOrder(id: number, userId: number) {
    return this.prismaService.order.findFirst({
      where: { id, user_id: userId },
    });
  }

  findByUserId(userId: number) {
    return this.prismaService.order.findMany({
      where: { user_id: userId },
    });
  }

  create(data: Prisma.OrderCreateInput) {
    return this.prismaService.order.create({ data });
  }

  update(id: number, data: Prisma.OrderUpdateInput) {
    return this.prismaService.order.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  count() {
    return this.prismaService.order.count();
  }

  countByUserId(userId: number) {
    return this.prismaService.order.count({
      where: { user_id: userId },
    });
  }

  findUserOrderByCampaignOption(userId: number, campaignOptionId: number) {
    return this.prismaService.order.findFirst({
      where: {
        user_id: userId,
        campaign_option_id: campaignOptionId,
      },
    });
  }
}
