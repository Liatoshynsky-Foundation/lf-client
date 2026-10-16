import { Locale } from 'next-intl';
import { z } from 'zod';

import { PageDataMap } from '~/types/page/pagesBase.type';

import { NoIDSchema, NoPageType, NoTime } from '~/validators/constants';
import { LocalizeSchema } from '~/validators/localization';
import { createAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { ArchivePageSchema } from '~/validators/pagesSchemas/pages/archive.schema';
import { createArtistryPageSchema } from '~/validators/pagesSchemas/pages/artistry.schema';
import { BiographyPageSchema } from '~/validators/pagesSchemas/pages/biography.schema';
import { CooperationPageSchema } from '~/validators/pagesSchemas/pages/cooperation.schema';
import { createPrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { ResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';
import { createWarInUkrainePageSchema } from '~/validators/pagesSchemas/pages/war-in-ukraine.schema';

export const PAGE_SLUGS = [
  'about-us',
  'privacy-policy',
  'research',
  'biography',
  'cooperation',
  'artistry',
  'war-in-ukraine',
  'archive'
] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];

export const isPageSlug = (slug: string): slug is PageSlug => PAGE_SLUGS.includes(slug as PageSlug);

const schemaFactories: { [K in PageSlug]: (locale: Locale) => z.ZodType<PageDataMap[K]> } = {
  'about-us': (locale) => LocalizeSchema(NoTime(NoIDSchema(NoPageType(createAboutUsPageSchema(locale)))), locale),
  'privacy-policy': (locale) =>
    LocalizeSchema(NoTime(NoIDSchema(NoPageType(createPrivacyPolicyPageSchema(locale)))), locale),
  research: (locale) => LocalizeSchema(NoTime(NoIDSchema(NoPageType(ResearchPageSchema))), locale),
  biography: (locale) => LocalizeSchema(NoTime(NoIDSchema(NoPageType(BiographyPageSchema))), locale),
  cooperation: (locale) => LocalizeSchema(NoTime(NoIDSchema(NoPageType(CooperationPageSchema))), locale),
  artistry: (locale) => LocalizeSchema(NoTime(NoIDSchema(NoPageType(createArtistryPageSchema(locale)))), locale),
  'war-in-ukraine': (locale) =>
    LocalizeSchema(NoTime(NoIDSchema(NoPageType(createWarInUkrainePageSchema(locale)))), locale),
  archive: (locale) =>
    LocalizeSchema(NoTime(NoIDSchema(NoPageType(ArchivePageSchema))), locale, {
      allowEmptyFields: ['description']
    })
};

export function SchemaFactory<S extends PageSlug>(slug: S, locale: Locale): z.ZodType<PageDataMap[S]> | undefined {
  return isPageSlug(slug) ? schemaFactories[slug](locale) : undefined;
}
