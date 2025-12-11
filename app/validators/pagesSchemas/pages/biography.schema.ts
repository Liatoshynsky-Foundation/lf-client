import { z } from 'zod';

import { PageStatus } from '~/types/enums/common.enums';
import { ContentType, ImagesSizes } from '~/types/page/biography.types';

import { mongoObjectIdSchema, translatedFieldSchema } from '~/validators/constants';
import { ImageSchema, QuoteSchema } from '~/validators/pagesSchemas/pages/_common.schema';
import { TipTapDocSchema } from '~/validators/pagesSchemas/tiptap.schema';

const LocalizedTipTapDocSchema = z.object({
  uk: TipTapDocSchema,
  en: TipTapDocSchema
});

const AdvancedImageSchema = z.intersection(
  ImageSchema,
  z.object({
    size: z.nativeEnum(ImagesSizes),
    rectangleTopLeftCorner: z.boolean().default(false)
  })
);

const ChronologyListItemSchema = z.object({
  description: LocalizedTipTapDocSchema
});

const ChronologyListSchema = z.object({
  type: z.literal(ContentType.ChronologyList),
  listItems: z.array(ChronologyListItemSchema),
  additionalImage: AdvancedImageSchema.optional()
});

const ExcerptBlockItemSchema = z.object({
  type: z.literal(ContentType.ExcerptBlockItem),
  quote: z.object({
    text: translatedFieldSchema,
    source: translatedFieldSchema
  })
});

const OnlyImageBlockSchema = z.object({
  type: z.literal(ContentType.OnlyImageBlock),
  mainImage: AdvancedImageSchema,
  additionalImage: AdvancedImageSchema.optional()
});

const FullWidthImageSchema = z.object({
  type: z.literal(ContentType.FullWidthImage),
  image: ImageSchema
});

const BiographyContentItemSchema = z.discriminatedUnion('type', [
  ChronologyListSchema,
  ExcerptBlockItemSchema,
  OnlyImageBlockSchema,
  FullWidthImageSchema
]);

const BiographyContentBlockSchema = z.object({
  yearTitle: z.string().nullable(),
  items: z.array(BiographyContentItemSchema)
});

const HeroImageSchema = z
  .object({
    src: z.string(),
    alt: translatedFieldSchema,
    caption: z.object({
      mainText: translatedFieldSchema,
      yearText: translatedFieldSchema
    })
  })
  .transform((image) => ({
    ...image,
    generatedSrc: `/api/blob-url?folderName=photos&blobName=${image.src}`
  }));

const HeroSectionBlockSchema = z.object({
  image: HeroImageSchema,
  quote: QuoteSchema,
  biographyText: LocalizedTipTapDocSchema,
  noteText: translatedFieldSchema
});

const BiographyBlocksSchema = z.object({
  heroSection: HeroSectionBlockSchema,
  biographyContent: z.array(BiographyContentBlockSchema)
});

export const BiographyPageSchema = z.object({
  pageType: z.literal('BiographyPage'),
  slug: z.string(),
  title: translatedFieldSchema,
  status: z.nativeEnum(PageStatus),
  blocks: BiographyBlocksSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: mongoObjectIdSchema
});
