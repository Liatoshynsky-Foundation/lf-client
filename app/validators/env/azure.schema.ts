import { z } from 'zod';

import { envErrors } from '~/constants/errors';

export const dbSchema = z
  .object({
    AZURE_SAS_URL: z
      .string({
        required_error: envErrors.AZURE_SAS_URL.REQUIRED,
        invalid_type_error: envErrors.AZURE_SAS_URL.INVALID
      })
      .nonempty(envErrors.AZURE_SAS_URL.EMPTY)
  })
  .superRefine((env, ctx) => {
    if (!env.AZURE_SAS_URL) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: envErrors.AZURE_CREDENTIALS_REQUIRED,
        path: []
      });
    }
  });

export const env = dbSchema.parse(process.env);
