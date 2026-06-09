import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const currentUserSchema = z.object({
  email: z.string().trim(),
  id: z.coerce
    .number()
    .int({ message: 'O id deve ser um número inteiro' })
    .min(0, { message: 'O id não pode ser negativo' }),
});

export class CurrentUserDto extends createZodDto(currentUserSchema) {}
