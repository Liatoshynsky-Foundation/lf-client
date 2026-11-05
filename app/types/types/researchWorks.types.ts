import z from 'zod';

import { researchWorkSchema } from '~/validators/researchWorks.schema';

export type ResearchWorkDb = z.infer<typeof researchWorkSchema>;
