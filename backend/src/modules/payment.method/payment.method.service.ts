import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PaymentMethodRepository } from './payment.method.repository.js';
import { CreatePaymentMethodDto } from '../../dtos/payment.method/create-payment-method.dto.js';

@Injectable()
export class PaymentMethodService {
  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ) {}

  async searchPaymentMethod(id: number) {
    const PaymentMethod =
      await this.paymentMethodRepository.searchPaymentMethod({ id });

    if (!PaymentMethod) {
      throw new NotFoundException('Método de pagamento não encontrado');
    }

    return PaymentMethod;
  }

  async createPaymentMethod(data: CreatePaymentMethodDto) {
    const paymentExist = await this.paymentMethodRepository.searchPaymentMethod(
      { name: data.name },
    );

    if (paymentExist) {
      throw new ConflictException(
        'Já existe um método de pagamento com este nome',
      );
    }

    return await this.paymentMethodRepository.create(data);
  }
}
