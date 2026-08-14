import { Locale } from 'next-intl';

import { PageSlug, SchemaFactory } from './schema-factory';

jest.mock('~/validators/pagesSchemas/pages/about-us.schema', () => ({
  AboutUsPageSchema: { __schema: 'about-us' }
}));
jest.mock('~/validators/pagesSchemas/pages/privacy-policy.schema', () => ({
  PrivacyPolicyPageSchema: { __schema: 'privacy-policy' }
}));
jest.mock('~/validators/pagesSchemas/pages/research.schema', () => ({
  ResearchPageSchema: { __schema: 'research' }
}));
jest.mock('~/validators/pagesSchemas/pages/biography.schema', () => ({
  BiographyPageSchema: { __schema: 'biography' }
}));
jest.mock('~/validators/pagesSchemas/pages/cooperation.schema', () => ({
  CooperationPageSchema: { __schema: 'cooperation' }
}));
jest.mock('~/validators/pagesSchemas/pages/artistry.schema', () => ({
  ArtistryPageSchema: { __schema: 'artistry' }
}));
jest.mock('~/validators/pagesSchemas/pages/war-in-ukraine.schema', () => ({
  WarInUkrainePageSchema: { __schema: 'war-in-ukraine' }
}));

jest.mock('~/validators/constants', () => {
  const { z } = jest.requireActual<typeof import('zod')>('zod');
  const NoOp = <T>(s: T): T => s;

  return {
    NoTime: NoOp,
    NoIDSchema: NoOp,
    NoPageType: NoOp,
    translatedFieldSchema: z.object({
      uk: z.string(),
      en: z.string()
    }),
    translatedTipTapSchema: z.object({
      uk: z.object({ type: z.literal('doc'), content: z.array(z.record(z.string(), z.unknown())) }),
      en: z.object({ type: z.literal('doc'), content: z.array(z.record(z.string(), z.unknown())) })
    }),
    mongoObjectIdSchema: z.custom<string>((val) => typeof val === 'string', 'Invalid ObjectId')
  };
});

jest.mock('~/validators/localization', () => {
  return {
    LocalizeSchema: jest.fn((schema: any, locale: Locale) => ({ __schema: schema.__schema, locale }))
  };
});

import { LocalizeSchema } from '~/validators/localization';
import { AboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { ArtistryPageSchema } from '~/validators/pagesSchemas/pages/artistry.schema';
import { BiographyPageSchema } from '~/validators/pagesSchemas/pages/biography.schema';
import { CooperationPageSchema } from '~/validators/pagesSchemas/pages/cooperation.schema';
import { PrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { ResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';
import { WarInUkrainePageSchema } from '~/validators/pagesSchemas/pages/war-in-ukraine.schema';

describe('SchemaFactory', () => {
  const locale: Locale = 'uk';

  it.each([
    ['about-us', 'about-us', AboutUsPageSchema, { allowEmptyFields: ['list'] }],
    ['privacy-policy', 'privacy-policy', PrivacyPolicyPageSchema, undefined],
    ['research', 'research', ResearchPageSchema, undefined],
    ['biography', 'biography', BiographyPageSchema, undefined],
    ['cooperation', 'cooperation', CooperationPageSchema, undefined],
    ['artistry', 'artistry', ArtistryPageSchema, undefined],
    ['war-in-ukraine', 'war-in-ukraine', WarInUkrainePageSchema, undefined]
  ] as const)('returns schema for slug "%s"', (slug, tag, schemaConst, expectedOptions) => {
    const schema = SchemaFactory(slug as PageSlug, locale);

    if (expectedOptions) {
      expect(LocalizeSchema).toHaveBeenCalledWith(expect.objectContaining(schemaConst), locale, expectedOptions);
    } else {
      expect(LocalizeSchema).toHaveBeenCalledWith(expect.objectContaining(schemaConst), locale);
    }
    expect(schema).toEqual({ __schema: tag, locale });
  });

  it('returns undefined for unknown slug', () => {
    expect(SchemaFactory('unknown' as unknown as PageSlug, locale)).toBeUndefined();
  });
});
