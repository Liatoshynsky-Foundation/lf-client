import { Locale } from 'next-intl';
import { z } from 'zod';

import { PageDataMap } from '~/types/page/pagesBase.type';

import { LocalizeSchema, NoIDSchema, NoPageType, NoTime } from '~/validators/constants';
import { AboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { BiographyPageSchema } from '~/validators/pagesSchemas/pages/biography.schema';
import { PrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { ResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

export const PAGE_SLUGS = ['about-us', 'privacy-policy', 'research', 'biography'] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];

export const isPageSlug = (slug: string): slug is PageSlug => PAGE_SLUGS.includes(slug as PageSlug);

const schemaFactories: { [K in PageSlug]: (locale: Locale) => z.ZodType<PageDataMap[K]> } = {
  'about-us': (locale) => LocalizeSchema(NoTime(NoIDSchema(NoPageType(AboutUsPageSchema))), locale),
  'privacy-policy': (locale) => LocalizeSchema(NoTime(NoIDSchema(NoPageType(PrivacyPolicyPageSchema))), locale),
  research: (locale) => LocalizeSchema(NoTime(NoIDSchema(NoPageType(ResearchPageSchema))), locale),
  biography: (locale) => LocalizeSchema(NoTime(NoIDSchema(NoPageType(BiographyPageSchema))), locale)
};

export function SchemaFactory<S extends PageSlug>(slug: S, locale: Locale): z.ZodType<PageDataMap[S]> | undefined {
  return isPageSlug(slug) ? schemaFactories[slug](locale) : undefined;
}
