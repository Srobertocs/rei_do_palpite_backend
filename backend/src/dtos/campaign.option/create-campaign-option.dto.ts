import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createCampaignOptionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'O nome é obrigatório' })
    .max(255, { message: 'O nome pode ter no máximo 255 caracteres' }),

  campaign_id: z
    .number()
    .int({ message: 'O ID da campanha (bolão) deve ser um número inteiro' })
    .positive({ message: 'O ID da campanha (bolão) deve ser positivo' }),
});

export class CreateCampaignOptionDto extends createZodDto(
  createCampaignOptionSchema,
) {}
