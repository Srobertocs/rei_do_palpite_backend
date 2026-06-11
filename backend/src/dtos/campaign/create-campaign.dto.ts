import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
// import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

// extendZodWithOpenApi(z);

export const createCampaignSchema = z
  .object({
    code: z
      .number()
      .min(1, { message: 'O código deve ser maior que 0' })
      .int({ message: 'O código deve ser um número inteiro' })
      .nonnegative({ message: 'O código não pode ser negativo' }),

    name: z
      .string()
      .trim()
      .min(1, { message: 'O nome é obrigatório' })
      .max(255, { message: 'O nome pode ter no máximo 255 caracteres' }),

    dt_start: z
      .string()
      .date({ message: 'A data de início é obrigatória' })
      .describe('Formato esperado: YYYY-MM-DD. Exemplo: 2026-06-15')
      .transform((val) => new Date(`${val}T00:00:00.000Z`)),

    dt_end: z
      .string()
      .date({ message: 'A data de encerramento é obrigatória' })
      .describe('Formato esperado: YYYY-MM-DD. Exemplo: 2026-06-15')
      .transform((val) => new Date(`${val}T00:00:00.000Z`)),

    fee_operational: z
      .number()
      .min(1, { message: 'A taxa operacional deve ser maior que 0' })
      .nonnegative({ message: 'A taxa operacional não pode ser negativa' }),

    campaign_value: z
      .number()
      .min(1, { message: 'O valor da campanha deve ser maior que 0' })
      .nonnegative({ message: 'O valor da campanha não pode ser negativo' }),

    is_public: z
      .boolean({
        message: 'Definir se a campanha é pública ou privada é obrigatório',
      })
      .default(false),
  })
  .refine((data) => data.dt_end > data.dt_start, {
    message: 'A data de encerramento deve ser posterior à data de início',
    path: ['dt_end'],
  })
  .refine(
    (data) => {
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);

      return data.dt_start >= currentDate;
    },
    {
      message: 'A data de início não pode ser menor do que o dia de hoje',
      path: ['dt_start'],
    },
  );

export class CreateCampaignDto extends createZodDto(createCampaignSchema) {}
