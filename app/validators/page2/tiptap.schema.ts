import { z } from 'zod';

const BaseNodeSchema = z.object({
  type: z.string(),
  attrs: z.record(z.any()).optional(),
  marks: z.array(z.object({ type: z.string(), attrs: z.record(z.any()).optional() })).optional()
});
type BaseNode = z.infer<typeof BaseNodeSchema>;

export type Node = BaseNode & {
  content?: Node[];
  text?: string;
};

export const NodeSchema: any = BaseNodeSchema.extend({
  content: z.lazy(() => z.array(NodeSchema)).optional(),
  text: z.string().optional()
});

export const DocSchema = z.object({
  type: z.literal('doc'),
  content: z.array(NodeSchema)
});

export type Doc = z.infer<typeof DocSchema>;
