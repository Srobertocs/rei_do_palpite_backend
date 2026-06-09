import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const updateOrderSchema = z.object({
  comprovante: z
    .string()
    .trim()
    .min(1, { message: 'O comprovante é obrigatório' })
    .max(500, { message: 'O comprovante pode ter no máximo 500 caracteres' })
    .optional(),
  payment_method_id: z
    .number()
    .int({ message: 'O ID do método de pagamento deve ser um número inteiro' })
    .positive({ message: 'O ID do método de pagamento deve ser positivo' })
    .optional(),
});

export class UpdateOrderDto extends createZodDto(updateOrderSchema) {}
