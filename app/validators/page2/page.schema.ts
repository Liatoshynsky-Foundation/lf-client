import { z } from 'zod';

import { RichContentSchema, TeamBlockNodeSchema } from './customNodes.schema';

import { mongoObjectIdSchema } from '~/validators/constants';

const LocalizedContentSchema = z.object({
  uk: RichContentSchema,
  en: RichContentSchema
});

const BaseElementSchema = z.object({
  _id: z.any().optional(),
  content: LocalizedContentSchema
});

const HeadingElementSchema = BaseElementSchema.extend({ elementType: z.literal('Heading') });
const ParagraphElementSchema = BaseElementSchema.extend({ elementType: z.literal('Paragraph') });
const ImageElementSchema = BaseElementSchema.extend({ elementType: z.literal('Image') });
const BulletedListElementSchema = BaseElementSchema.extend({ elementType: z.literal('BulletedList') });
const QuoteElementSchema = BaseElementSchema.extend({ elementType: z.literal('Quote') });
const TitledListElementSchema = BaseElementSchema.extend({ elementType: z.literal('TitledList') });

const TeamElementSchema = BaseElementSchema.extend({
  elementType: z.literal('Team'),
  content: z.object({
    uk: RichContentSchema.extend({ content: z.array(TeamBlockNodeSchema) }),
    en: RichContentSchema.extend({ content: z.array(TeamBlockNodeSchema) })
  })
});

export const ElementSchema = z.discriminatedUnion('elementType', [
  HeadingElementSchema,
  ParagraphElementSchema,
  ImageElementSchema,
  BulletedListElementSchema,
  QuoteElementSchema,
  TitledListElementSchema,
  TeamElementSchema
]);

const ContentConstructorBlockSchema = z.object({
  _id: mongoObjectIdSchema,
  elements: z.array(ElementSchema)
});

const TeamBlockSchema = z.object({
  _id: mongoObjectIdSchema,
  elements: z.tuple([TeamElementSchema])
});

export const BlockSchema = z.union([ContentConstructorBlockSchema, TeamBlockSchema]);

export const PageSchema = z.object({
  _id: mongoObjectIdSchema,
  slug: z.string(),
  title: z.object({
    uk: z.string(),
    en: z.string()
  }),
  status: z.enum(['draft', 'published']),
  blocks: z.array(BlockSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type Element = z.infer<typeof ElementSchema>;
export type Block = z.infer<typeof BlockSchema>;
export type Page = z.infer<typeof PageSchema>;
