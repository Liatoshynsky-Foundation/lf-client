import { z } from 'zod';

import { PageSchema as PageZodSchema } from '~/validators/pagesSchemas/pages';

export type PageDto = z.infer<typeof PageZodSchema>;

export type PagesDataRepository = {
  getBySlugAndStatus: (slug: string, status: 'draft' | 'published') => Promise<PageDto | null>;
};
