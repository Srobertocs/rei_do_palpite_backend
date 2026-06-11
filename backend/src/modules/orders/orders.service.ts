import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { OrderRepository } from './orders.repository.js';
import { CreateOrderDto } from '../../dtos/order/create-order.dto.js';
import { UpdateOrderDto } from '../../dtos/order/update-order.dto.js';
import { CampaignOptionService } from '../campaign.option/campaign.option.service.js';
import { PaymentMethodService } from '../payment.method/payment.method.service.js';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly campaignOptionService: CampaignOptionService,
    private readonly paymentMethodService: PaymentMethodService,
  ) {}

  async getById(id: number, userId: number) {
    const order = await this.orderRepository.findOrder(id, userId);

    if (!order) {
      throw new NotFoundException(
        `Pedido com ID ${id} não encontrado ou não pertence ao usuário`,
      );
    }

    return order;
  }

  async getByUserId(userId: number) {
    const orders = await this.orderRepository.findByUserId(userId);

    if (orders.length === 0) {
      throw new NotFoundException(
        'O usuário não possui pedidos cadastrados no momento',
      );
    }

    return orders;
  }

  async createOrder(data: CreateOrderDto, userId: number) {
    await Promise.all([
      this.campaignOptionService.searchCampaignOption(data.campaign_option_id),
      this.paymentMethodService.searchPaymentMethod(data.payment_method_id),
    ]);

    const orderExists =
      await this.orderRepository.findUserOrderByCampaignOption(
        userId,
        data.campaign_option_id,
      );

    if (orderExists) {
      throw new ConflictException(
        'Você já tem um pedido vinculado a esta opção de campanha',
      );
    }

    return this.orderRepository.create({
      comprovante: data.comprovante,
      user: {
        connect: { id: userId },
      },
      campaign_option: {
        connect: { id: data.campaign_option_id },
      },
      payment_method: {
        connect: { id: data.payment_method_id },
      },
    });
  }

  async updateOrder(id: number, userId: number, data: UpdateOrderDto) {
    const orderExists = await this.orderRepository.findOrder(id, userId);

    if (!orderExists) {
      throw new NotFoundException(
        `Pedido com ID ${id} não encontrado ou não pertence ao usuário`,
      );
    }

    const updateOrder = await this.orderRepository.update(id, {
      comprovante: data.comprovante,
      payment_method: {
        connect: { id: data.payment_method_id },
      },
    });

    if (!updateOrder) {
      throw new Error('Erro ao atualizar pedido');
    }

    return updateOrder;
  }

  async deleteOrder(id: number, userId: number) {
    const orderExists = await this.orderRepository.findOrder(id, userId);

    if (!orderExists) {
      throw new NotFoundException(
        `Pedido com ID ${id} não encontrado ou não pertence ao usuário`,
      );
    }

    const deleteOrder = await this.orderRepository.delete(id);

    if (!deleteOrder) {
      throw new Error('Erro ao deletar pedido');
    }

    return { message: 'Pedido deletado com sucesso' };
  }
}
