import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'O nome é obrigatório' })
    .min(5, { message: 'O nome deve ter pelo menos 5 caracteres' })
    .max(100, { message: 'O nome pode ter no máximo 100 caracteres' }),
  cpf: z
    .string()
    .trim()
    .min(1, { message: 'O cpf é obrigatório' })
    .min(11, { message: 'O cpf deve ter pelo menos 11 digitos' })
    .max(11, { message: 'O cpf deve ter no máximo 11 digitos' }),
  tel: z
    .string()
    .trim()
    .min(1, { message: 'O telefone é obrigatório' })
    .max(16, { message: 'O telefone deve ter no máximo 16 digitos' })
    .min(8, { message: 'O telefone deve ter pelo menos 8 digitos' }),
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
  status: z
    .enum(['ATIVO', 'INATIVO', 'BLOQUEADO', 'PENDENTE'], {
      message:
        'Status inválido. Deve ser: ATIVO, INATIVO, BLOQUEADO ou PENDENTE',
    })
    .default('ATIVO'),
  user_type: z
    .enum(['ADMIN', 'OPERATOR'], {
      message: 'Tipo de usuário inválido. Deve ser: ADMIN ou OPERATOR',
    })
    .default('OPERATOR'),
});

export class RegisterDto extends createZodDto(registerSchema) {}
