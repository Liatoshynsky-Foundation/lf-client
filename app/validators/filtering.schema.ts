import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const getFilteringSchema = (minYear: number, maxYear: number, t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      from: z
        .string()
        .transform(Number)
        .refine((val) => val >= minYear, {
          message: t('minLength', { min: minYear })
        })
        .refine((val) => val <= maxYear, {
          message: t('maxLength', { max: maxYear })
        }),

      to: z
        .string()
        .transform(Number)
        .refine((val) => val >= minYear, {
          message: t('minLength', { min: minYear })
        })
        .refine((val) => val <= maxYear, {
          message: t('maxLength', { max: maxYear })
        })
    })
    .refine((data) => data.from <= data.to, {
      message: t('minDistance', { min: 1 }),
      path: ['to']
    });
