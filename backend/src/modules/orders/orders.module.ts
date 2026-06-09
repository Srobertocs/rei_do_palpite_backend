import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller.js';
import { OrderService } from './orders.service.js';
import { OrderRepository } from './orders.repository.js';
import { CampaignOptionModule } from '../campaign.option/campaign.option.module.js';
import { PaymentMethodModule } from '../payment.method/payment.method.module.js';

@Module({
  imports: [CampaignOptionModule, PaymentMethodModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrdersModule {}
