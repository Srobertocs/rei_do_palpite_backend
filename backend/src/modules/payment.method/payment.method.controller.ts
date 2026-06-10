import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentMethodService } from './payment.method.service.js';
import { CreatePaymentMethodDto } from '../../dtos/payment.method/create-payment-method.dto.js';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUserDto } from '../../dtos/current-user.dto.js';
import { CurrentUser } from '../../decorators/current-user.decorator.js';

@Controller('payment.method')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  async createPaymentMethod(
    @CurrentUser() user: CurrentUserDto,
    @Body() body: CreatePaymentMethodDto,
  ) {
    return await this.paymentMethodService.createPaymentMethod(body, user.id);
  }

  @Get()
  async getAll(@CurrentUser() user: CurrentUserDto) {
    return await this.paymentMethodService.getAll(user.id);
  }

  @Delete('/:id')
  async delete(
    @CurrentUser() user: CurrentUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.paymentMethodService.delete(id, user.id);
  }
}
