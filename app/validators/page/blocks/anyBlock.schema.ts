import { z } from 'zod';

import { contentConstructorBlockSchema } from '~/validators/page/blocks/contentConstructorBlock.schema';
import { teamBlockSchema } from '~/validators/page/blocks/teamBlock.schema';

export const anyBlockSchema = z.discriminatedUnion('blockType', [contentConstructorBlockSchema, teamBlockSchema]);

export type AnyBlock = z.infer<typeof anyBlockSchema>;
