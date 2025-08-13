import { z } from 'zod';

import { DocSchema, NodeSchema } from './tiptap.schema';

const StructuredQuoteNodeSchema = NodeSchema.extend({
  type: z.literal('structuredQuote'),
  content: z.tuple([
    NodeSchema.extend({ type: z.literal('quoteBody') }),
    NodeSchema.extend({ type: z.literal('quoteCaption') })
  ])
});

const TitledListItemNodeSchema = NodeSchema.extend({
  type: z.literal('titledListItem'),
  content: z.tuple([
    NodeSchema.extend({ type: z.literal('itemTitle') }),
    NodeSchema.extend({ type: z.literal('itemDescription') })
  ])
});

const TitledListNodeSchema = NodeSchema.extend({
  type: z.literal('titledList'),
  content: z.array(TitledListItemNodeSchema)
});

const TeamMemberItemSchema = NodeSchema.extend({
  type: z.literal('teamMemberItem'),
  attrs: z.object({
    imageName: z.string()
  }),
  content: z.tuple([
    NodeSchema.extend({ type: z.literal('teamMemberName') }),
    NodeSchema.extend({ type: z.literal('teamMemberDescription') })
  ])
});

const TeamMembersListSchema = NodeSchema.extend({
  type: z.literal('teamMembersList'),
  content: z.array(TeamMemberItemSchema)
});

export const TeamBlockNodeSchema = NodeSchema.extend({
  type: z.literal('teamBlockNode'),
  content: z.tuple([
    NodeSchema.extend({ type: z.literal('teamBlockTitle') }),
    NodeSchema.extend({ type: z.literal('teamBlockIntro') }),
    TeamMembersListSchema
  ])
});

export const RichContentSchema = DocSchema.extend({
  content: z.array(z.union([NodeSchema, StructuredQuoteNodeSchema, TitledListNodeSchema, TeamBlockNodeSchema]))
});

export type RichContent = z.infer<typeof RichContentSchema>;
