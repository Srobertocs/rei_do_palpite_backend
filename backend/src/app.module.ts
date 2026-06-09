import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { CampaignOptionModule } from './modules/campaign.option/campaign.option.module.js';
import { CampaignModule } from './modules/campaign/campaign.module.js';
import { PaymentMethodModule } from './modules/payment.method/payment.method.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    OrdersModule,
    CampaignModule,
    CampaignOptionModule,
    PaymentMethodModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
