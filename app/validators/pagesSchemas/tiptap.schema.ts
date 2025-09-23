import { z } from 'zod';

const _BaseNodeSchema = z.object({
  type: z.string(),
  attrs: z.record(z.any()).optional(),
  marks: z.array(z.record(z.any())).optional()
});
type BaseNode = z.infer<typeof _BaseNodeSchema>;

export interface Node extends BaseNode {
  content?: Node[];
  text?: string;
}

export const NodeSchema: z.ZodType<Node> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.any()).optional(),
    content: z.array(NodeSchema).optional(),
    text: z.string().optional(),
    marks: z.array(z.record(z.any())).optional()
  })
);

export const TipTapContentSchema = z.object({
  type: z.literal('doc'),
  content: z.array(NodeSchema).optional()
});

export type TipTapContent = z.infer<typeof TipTapContentSchema>;
