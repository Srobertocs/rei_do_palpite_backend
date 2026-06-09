import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment.method.service.js';
import { PaymentMethodController } from './payment.method.controller.js';
import { PaymentMethodRepository } from './payment.method.repository.js';

@Module({
  providers: [PaymentMethodService, PaymentMethodRepository],
  controllers: [PaymentMethodController],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
