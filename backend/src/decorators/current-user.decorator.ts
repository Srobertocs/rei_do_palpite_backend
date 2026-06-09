import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CurrentUserDto } from '../dtos/current-user.dto.js';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserDto => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: CurrentUserDto }>();
    return request.user;
  },
);
