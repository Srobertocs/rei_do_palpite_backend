import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { CampaignService } from './campaign.service.js';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUserDto } from '../../dtos/current-user.dto.js';
import { CurrentUser } from '../../decorators/current-user.decorator.js';
import { CreateCampaignDto } from '../../dtos/campaign/create-campaign.dto.js';

@Controller('campaign')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async createCampaign(
    @CurrentUser() user: CurrentUserDto,
    @Body() body: CreateCampaignDto,
  ) {
    return await this.campaignService.createCampaign(body, user.id);
  }
}
