import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const searchPaymentMethodSchema = z.object({
  id: z
    .number()
    .min(1, { message: 'O ID deve ser maior que 0' })
    .int({ message: 'O ID deve ser um número inteiro' })
    .optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: 'O comprovante é obrigatório' })
    .max(500, { message: 'O comprovante pode ter no máximo 500 caracteres' })
    .optional(),
});

export class SearchPaymentMethodDto extends createZodDto(
  searchPaymentMethodSchema,
) {}
