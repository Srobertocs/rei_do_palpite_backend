import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const TypePaymentMethodEnum = z.enum(['PIX', 'CARTAO_DEBITO'], {
  message: 'O tipo de pagamento deve ser PIX ou CARTAO_DEBITO',
});
const PaymentMethodStatusEnum = z.enum(['ATIVO', 'INATIVO']);

export const createPaymentMethodSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, { message: 'O comprovante é obrigatório' })
    .max(500, { message: 'O comprovante pode ter no máximo 500 caracteres' }),
  status: PaymentMethodStatusEnum.optional().default('ATIVO'),
  type_method: TypePaymentMethodEnum.optional().default('PIX'),
});

export class CreatePaymentMethodDto extends createZodDto(
  createPaymentMethodSchema,
) {}
