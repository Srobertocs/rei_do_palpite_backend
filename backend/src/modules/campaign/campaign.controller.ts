import { Controller, UseGuards } from '@nestjs/common';
import { CampaignService } from './campaign.service.js';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('campaign')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}
}
