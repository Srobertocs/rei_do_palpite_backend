import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CampaignRepository } from './campaign.repository.js';
import { CreateCampaignDto } from '../../dtos/campaign/create-campaign.dto.js';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async searchCampaign(id: number) {
    const campaign = await this.campaignRepository.searchCampaign({ id });

    if (!campaign) {
      throw new NotFoundException('Campanha não encontrada');
    }

    return campaign;
  }

  async createCampaign(data: CreateCampaignDto) {
    const campaign = await this.campaignRepository.searchCampaign({
      code: data.code,
    });

    if (campaign) {
      throw new ConflictException('Já existe uma campanha com este código');
    }

    return await this.campaignRepository.create(data);
  }
}
