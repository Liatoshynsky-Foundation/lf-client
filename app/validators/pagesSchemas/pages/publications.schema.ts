import z from 'zod';

import { pageSeoFields } from './seo.schema';
import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, translatedFieldSchema, translatedTipTapSchema } from '~/validators/constants';

const PublicationsBlockSchema = z.object({
  PublicationsIntro: z.object({
    publicationsIntro: translatedTipTapSchema,
    publicationsOutro: translatedTipTapSchema
  })
});

export const PublicationsPageSchema = z.object({
  pageType: z.literal('PublicationsPage'),
  slug: z.string(),
  title: translatedFieldSchema,
  status: z.nativeEnum(PageStatus),
  blocks: PublicationsBlockSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: mongoObjectIdSchema,
  ...pageSeoFields
});
