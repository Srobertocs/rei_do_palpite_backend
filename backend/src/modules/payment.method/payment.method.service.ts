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

  async createPaymentMethod(data: CreatePaymentMethodDto, userId: number) {
    const paymentExist = await this.paymentMethodRepository.searchPaymentMethod(
      { type_method: data.type_method },
    );

    if (paymentExist) {
      throw new ConflictException(
        'Já existe um método de pagamento com este tipo',
      );
    }

    return await this.paymentMethodRepository.create({
      type_method: data.type_method,
      description: data.description,
      user: {
        connect: { id: userId },
      },
    });
  }

  async getAll(userId: number) {
    const paymentMethods = await this.paymentMethodRepository.findAll(userId);

    if (paymentMethods.length === 0) {
      throw new NotFoundException('Nenhum método de pagamento cadastrado');
    }

    return paymentMethods;
  }

  async delete(id: number, userId: number) {
    const paymentMethodsExist =
      await this.paymentMethodRepository.searchPaymentMethod({
        id,
        user_id: userId,
      });

    if (!paymentMethodsExist) {
      throw new NotFoundException('Método de pagamento não encontrado');
    }

    const deletePaymentMethod = await this.paymentMethodRepository.delete(id);

    if (!deletePaymentMethod) {
      throw new Error('Erro ao deletar método de pagamento');
    }

    return { message: 'Método de pagamento deletado com sucesso' };
  }
}
