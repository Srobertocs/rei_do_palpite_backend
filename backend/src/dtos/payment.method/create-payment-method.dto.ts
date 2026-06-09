import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createPaymentMethodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'O comprovante é obrigatório' })
    .max(500, { message: 'O comprovante pode ter no máximo 500 caracteres' }),
});

export class CreatePaymentMethodDto extends createZodDto(
  createPaymentMethodSchema,
) {}
