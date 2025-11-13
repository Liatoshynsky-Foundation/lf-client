import { Locale } from 'next-intl';
import { z } from 'zod';

import type { ArchiveCaseDetail } from '~/types/page/archive.types';

import { translatedFieldSchema } from '~/validators/constants';

const ArchiveCaseItemRaw = z.object({
  order: z.number().int().positive(),
  text: translatedFieldSchema
});

export const ArchiveCaseRaw = z.object({
  fund: z.string().min(1),
  caseSlug: z.string().min(1),
  title: translatedFieldSchema,
  code: z.string().min(1),
  dates: z.string().min(1),
  sheetsCount: z.number().int().nonnegative(),
  items: z.array(ArchiveCaseItemRaw),
  pdfUrl: z.string().url().optional(),
  prev: z
    .object({ title: translatedFieldSchema, href: z.string().min(1) })
    .nullable()
    .optional(),
  next: z
    .object({ title: translatedFieldSchema, href: z.string().min(1) })
    .nullable()
    .optional()
});

export const createLocalizedArchiveCaseSchema = (locale: Locale) =>
  ArchiveCaseRaw.transform(
    (raw): ArchiveCaseDetail => ({
      id: `${raw.fund}-${raw.caseSlug}`,
      fund: raw.fund,
      caseSlug: raw.caseSlug,
      title: raw.title[locale],
      code: raw.code,
      dates: raw.dates,
      sheetsCount: raw.sheetsCount,
      items: raw.items
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((i) => ({ order: i.order, text: i.text[locale] })),
      pdfUrl: raw.pdfUrl,
      prev: raw.prev ? { title: raw.prev.title[locale], href: raw.prev.href } : null,
      next: raw.next ? { title: raw.next.title[locale], href: raw.next.href } : null
    })
  );
