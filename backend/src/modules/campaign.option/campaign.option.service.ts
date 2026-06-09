import { Injectable, NotFoundException } from '@nestjs/common';
import { CampaignOptionRepository } from './campaign.option.repository.js';
import { CreateCampaignOptionDto } from '../../dtos/campaign.option/create-campaign-option.dto.js';
import { CampaignService } from '../campaign/campaign.service.js';

@Injectable()
export class CampaignOptionService {
  constructor(
    private readonly campaignOptionRepository: CampaignOptionRepository,
    private readonly campaignService: CampaignService,
  ) {}

  async searchCampaignOption(id: number) {
    const campaignOption =
      await this.campaignOptionRepository.searchCampaignOption(id);

    if (!campaignOption) {
      throw new NotFoundException('Opção de campanha não encontrada');
    }

    return campaignOption;
  }

  async createCampaignOption(data: CreateCampaignOptionDto) {
    await this.campaignService.searchCampaign(data.campaign_id);

    return await this.campaignOptionRepository.create({
      name: data.name,
      campaign: {
        connect: { id: data.campaign_id },
      },
    });
  }
}
