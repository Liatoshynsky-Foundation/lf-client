import { z } from 'zod';

import { PageSchema as PageZodSchema } from '~/validators/pagesSchemas/pages';

export type PageDto = z.infer<typeof PageZodSchema>;

export type PagesDataRepository = {
  getBySlug: (slug: string) => Promise<PageDto | null>;
  getDraftBySlug: (slug: string) => Promise<PageDto | null>;
};
