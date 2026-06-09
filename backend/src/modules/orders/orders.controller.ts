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

  @Get()
  async getAll() {
    return await this.orderService.getAll();
  }

  @Get('user/:userId')
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
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.orderService.create(createOrderDto, user.id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.orderService.update(user.id, id, updateOrderDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.orderService.delete(id, user.id);
  }
}
