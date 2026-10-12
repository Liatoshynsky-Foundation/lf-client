import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';

import { mongoObjectIdSchema, translatedTipTapSchema } from '~/validators/constants';

const ArchiveBlocksSchema = z.object({
  PageCaption: z.object({
    description: translatedTipTapSchema
  })
});

export const ArchivePageSchema = z.object({
  pageType: z.literal('ArchivePage'),
  slug: z.literal('archive'),
  title: z.object({ uk: z.string(), en: z.string() }),
  status: z.nativeEnum(PageStatus),
  blocks: ArchiveBlocksSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: mongoObjectIdSchema
});
