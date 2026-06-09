import { Module } from '@nestjs/common';
import { CampaignOptionController } from './campaign.option.controller.js';
import { CampaignOptionService } from './campaign.option.service.js';
import { CampaignOptionRepository } from './campaign.option.repository.js';
import { CampaignModule } from '../campaign/campaign.module.js';

@Module({
  imports: [CampaignModule],
  controllers: [CampaignOptionController],
  providers: [CampaignOptionService, CampaignOptionRepository],
  exports: [CampaignOptionService],
})
export class CampaignOptionModule {}
