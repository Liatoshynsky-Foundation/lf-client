import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';
import { PartnershipImageType } from '~/types/page/cooperation.types';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';

const PartnershipCardSchema = z.object({
  icon: z.string().optional(),
  title: translatedFieldSchema,
  list: z.array(translatedFieldSchema)
});

const PartnershipImageSchema = z.object({
  src: z.string(),
  alt: translatedFieldSchema,
  imageType: z.nativeEnum(PartnershipImageType)
});

export const PartnershipFormatsBlockSchema = z.object({
  title: translatedFieldSchema,

  firstRowFirstCard: PartnershipCardSchema.optional(),
  firstRowSecondCard: PartnershipCardSchema.optional(),

  firstRowImage: PartnershipImageSchema.optional(),
  secondRowImage: PartnershipImageSchema.optional(),

  secondRowFirstCard: PartnershipCardSchema.optional(),
  secondRowSecondCard: PartnershipCardSchema.optional(),

  descriptionText: translatedFieldSchema.optional(),
  actionButtonText: translatedFieldSchema.optional(),

  modalContent: z
    .object({
      formTitle: translatedFieldSchema.optional(),
      formSubtitle: translatedFieldSchema.optional()
    })
    .optional()
});

export const CooperationBlocksSchema = z.object({
  partnershipFormats: PartnershipFormatsBlockSchema
});

export const CooperationPageSchema = z.object({
  pageType: z.literal('CooperationPage'),
  slug: z.string(),
  title: translatedFieldSchema,
  status: z.nativeEnum(PageStatus),
  blocks: CooperationBlocksSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: mongoObjectIdSchema
});
