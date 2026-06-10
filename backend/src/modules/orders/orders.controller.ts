import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './orders.service.js';
import { CreateOrderDto } from '../../dtos/order/create-order.dto.js';
import { UpdateOrderDto } from '../../dtos/order/update-order.dto.js';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../../decorators/current-user.decorator.js';
import { CurrentUserDto } from '../../dtos/current-user.dto.js';

@Controller('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/user')
  async getByUserId(@CurrentUser() user: CurrentUserDto) {
    return await this.orderService.getByUserId(user.id);
  }

  @Get(':id')
  async getById(
    @CurrentUser() user: CurrentUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.orderService.getById(id, user.id);
  }

  @Post()
  async createOrder(
    @Body() body: CreateOrderDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.orderService.createOrder(body, user.id);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateOrderDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.orderService.updateOrder(user.id, id, body);
  }

  @Delete(':id')
  async deleteOrder(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.orderService.deleteOrder(id, user.id);
  }
}
