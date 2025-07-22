import { z } from 'zod';

import { populatedPageSchema } from '~/validators/page/page.schema';

export type PageDataDTO = z.infer<typeof populatedPageSchema>;
