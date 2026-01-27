import { z } from 'zod';

import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';

const BoldMarkSchema = z.object({ type: z.literal(TipTapMarkType.bold) });
const ItalicMarkSchema = z.object({ type: z.literal(TipTapMarkType.italic) });
const UnderlineMarkSchema = z.object({ type: z.literal(TipTapMarkType.underline) });
const LinkMarkSchema = z.object({
  type: z.literal(TipTapMarkType.link),
  attrs: z
    .object({
      href: z.string().optional(),
      target: z.string().optional(),
      rel: z.string().optional(),
      title: z.string().optional()
    })
    .optional()
});

export const MarkSchema = z.discriminatedUnion('type', [
  BoldMarkSchema,
  ItalicMarkSchema,
  UnderlineMarkSchema,
  LinkMarkSchema
]);

const TextNodeSchema = z.object({
  type: z.literal(TipTapNodeTypes.text),
  text: z.string(),
  marks: z.array(MarkSchema).optional()
});

const HeadingLevels = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]);

const HeadingNodeSchema = z.object({
  type: z.literal(TipTapNodeTypes.heading),
  attrs: z.object({ level: HeadingLevels.optional() }).optional(),
  content: z.array(TextNodeSchema).optional()
});

const ParagraphNodeSchema = z.object({
  type: z.literal(TipTapNodeTypes.paragraph),
  content: z.array(TextNodeSchema).optional()
});

export const TipTapDocSchema = z.object({
  type: z.literal(TipTapNodeTypes.doc),
  content: z.array(z.union([HeadingNodeSchema, ParagraphNodeSchema]))
});
