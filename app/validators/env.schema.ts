import { z } from 'zod';

import { envErrors } from '~/constants/errors';

export const envSchema = z
  .object({
    MONGO_DB: z
      .string({
        required_error: envErrors.MONGO_DB.REQUIRED,
        invalid_type_error: envErrors.MONGO_DB.INVALID
      })
      .nonempty(envErrors.MONGO_DB.EMPTY),

    MONGO_HOST: z
      .string({
        required_error: envErrors.MONGO_HOST.REQUIRED,
        invalid_type_error: envErrors.MONGO_HOST.INVALID
      })
      .nonempty(envErrors.MONGO_HOST.EMPTY),

    MONGO_PORT: z.preprocess((value) => {
      const num = value ? Number(value) : undefined;
      if (num !== undefined && Number.isNaN(num)) {
        throw new Error(envErrors.MONGO_PORT_INVALID);
      }
      return num;
    }, z.number().optional()),

    MONGO_USERNAME: z
      .string({
        required_error: envErrors.MONGO_USERNAME.REQUIRED,
        invalid_type_error: envErrors.MONGO_USERNAME.INVALID
      })
      .nonempty(envErrors.MONGO_USERNAME.EMPTY),

    MONGO_PASSWORD: z
      .string({
        required_error: envErrors.MONGO_PASSWORD.REQUIRED,
        invalid_type_error: envErrors.MONGO_PASSWORD.INVALID
      })
      .nonempty(envErrors.MONGO_PASSWORD.EMPTY),

    STORAGE_ACCOUNT: z
      .string({
        required_error: envErrors.STORAGE_ACCOUNT.REQUIRED,
        invalid_type_error: envErrors.STORAGE_ACCOUNT.INVALID
      })
      .nonempty(envErrors.STORAGE_ACCOUNT.EMPTY),

    SAS_TOKEN: z
      .string({
        required_error: envErrors.SAS_TOKEN.EMPTY,
        invalid_type_error: envErrors.SAS_TOKEN.EMPTY
      })
      .nonempty(envErrors.SAS_TOKEN.EMPTY)
  })
  .superRefine((env, ctx) => {
    if (env.MONGO_HOST === 'localhost') return;

    if (!env.MONGO_USERNAME || !env.MONGO_PASSWORD) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: envErrors.MONGO_CREDENTIALS_REQUIRED,
        path: []
      });
    }

    if (!env.STORAGE_ACCOUNT && !env.SAS_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: envErrors.AZURE_CREDENTIALS_REQUIRED,
        path: []
      });
    }
  });

export const env = envSchema.parse(process.env);
