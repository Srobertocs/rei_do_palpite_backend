import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const searchCampaignSchema = z.object({
  code: z
    .number()
    .min(1, { message: 'O código deve ser maior que 0' })
    .int({ message: 'O código deve ser um número inteiro' })
    .optional(),

  id: z
    .number()
    .min(1, { message: 'O ID deve ser maior que 0' })
    .int({ message: 'O ID deve ser um número inteiro' })
    .optional(),

  is_public: z
    .boolean({ message: 'O filtro deve ser um valor booleano' })
    .optional(),
});

export class SearchCampaignDto extends createZodDto(searchCampaignSchema) {}
