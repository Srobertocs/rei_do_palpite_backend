import z from 'zod';
import { createZodDto } from 'nestjs-zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'O e-mail é obrigatório' })
    .email({ message: 'O formato do e-mail está inválido' })
    .max(100, { message: 'O e-mail deve ter no máximo 100 caracteres' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'A senha deve ter pelo menos 8 dígitos' })
    .max(20, { message: 'A senha não pode ter mais de 20 dígitos' }),
});

export class LoginDto extends createZodDto(loginSchema) {}
