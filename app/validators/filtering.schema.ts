import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const getFilteringSchema = (minYear: number, maxYear: number, t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      from: z
        .string()
        .refine((val) => /^\d+$/.test(val), {
          message: t('onlyNumbers')
        })
        .transform(Number)
        .refine((val) => val >= minYear, {
          message: t('minValue', { min: minYear })
        })
        .refine((val) => val <= maxYear, {
          message: t('maxValue', { max: maxYear })
        }),

      to: z
        .string()
        .refine((val) => /^\d+$/.test(val), {
          message: t('onlyNumbers')
        })
        .transform(Number)
        .refine((val) => val >= minYear, {
          message: t('minValueTo', { min: minYear })
        })
        .refine((val) => val <= maxYear, {
          message: t('maxValue', { max: maxYear })
        })
    })
    .refine((data) => data.from <= data.to, {
      message: t('minDistance', { min: 1 }),
      path: ['to']
    });
