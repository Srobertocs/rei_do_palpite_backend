import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class CampaignOptionRepository {
  private readonly prismaService = PrismaService;

  searchCampaignOption(id: number) {
    return this.prismaService.campaignOption.findFirst({
      where: { id },
    });
  }

  create(data: Prisma.CampaignOptionCreateInput) {
    return this.prismaService.campaignOption.create({ data });
  }
}
