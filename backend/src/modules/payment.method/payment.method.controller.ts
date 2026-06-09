import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { PaymentMethodService } from './payment.method.service.js';
import { CreatePaymentMethodDto } from '../../dtos/payment.method/create-payment-method.dto.js';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('payment.method')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  async createPaymentMethod(@Body() body: CreatePaymentMethodDto) {
    return await this.paymentMethodService.createPaymentMethod(body);
  }
}
