import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const TypePaymentMethodEnum = z.enum(['PIX', 'CARTAO_DEBITO']);
const PaymentMethodStatusEnum = z.enum(['ATIVO', 'INATIVO']);

export const searchPaymentMethodSchema = z.object({
  id: z
    .number()
    .min(1, { message: 'O ID deve ser maior que 0' })
    .int({ message: 'O ID deve ser um número inteiro' })
    .optional(),

  type_method: TypePaymentMethodEnum.optional(),

  status: PaymentMethodStatusEnum.optional(),

  user_id: z
    .number()
    .min(1, { message: 'O ID deve ser maior que 0' })
    .int({ message: 'O ID deve ser um número inteiro' })
    .optional(),
});

export class SearchPaymentMethodDto extends createZodDto(
  searchPaymentMethodSchema,
) {}
