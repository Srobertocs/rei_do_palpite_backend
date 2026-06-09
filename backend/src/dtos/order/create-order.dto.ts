import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createOrderSchema = z.object({
  comprovante: z
    .string()
    .trim()
    .min(1, { message: 'O comprovante é obrigatório' })
    .max(500, { message: 'O comprovante pode ter no máximo 500 caracteres' }),
  campaign_option_id: z
    .number()
    .int({ message: 'O ID da opção de campanha deve ser um número inteiro' })
    .positive({ message: 'O ID da opção de campanha deve ser positivo' }),
  payment_method_id: z
    .number()
    .int({ message: 'O ID do método de pagamento deve ser um número inteiro' })
    .positive({ message: 'O ID do método de pagamento deve ser positivo' }),
});

export class CreateOrderDto extends createZodDto(createOrderSchema) {}
