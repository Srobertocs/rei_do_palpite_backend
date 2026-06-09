import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { CampaignOptionService } from './campaign.option.service.js';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCampaignOptionDto } from '../../dtos/campaign.option/create-campaign-option.dto.js';

@Controller('campaign.option')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class CampaignOptionController {
  constructor(private readonly campaignOptionService: CampaignOptionService) {}

  @Post()
  async createCampaignOption(@Body() body: CreateCampaignOptionDto) {
    return await this.campaignOptionService.createCampaignOption(body);
  }
}
