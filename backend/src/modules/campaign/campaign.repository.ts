import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service.js';
import { Prisma } from '@prisma/client';
import { SearchCampaignDto } from '../../dtos/campaign/search-campaign.dto.js';

@Injectable()
export class CampaignRepository {
  private readonly prismaService = PrismaService;

  searchCampaign(data: SearchCampaignDto) {
    return this.prismaService.campaign.findFirst({
      where: { ...data },
    });
  }

  create(data: Prisma.CampaignCreateInput) {
    return this.prismaService.campaign.create({ data });
  }
}
