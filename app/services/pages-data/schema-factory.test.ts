import { Locale } from 'next-intl';

import { PageSlug, SchemaFactory } from './schema-factory';

jest.mock('~/validators/pagesSchemas/pages/about-us.schema', () => ({
  createAboutUsPageSchema: jest.fn(() => ({ __schema: 'about-us' })),
  AboutUsPageSchema: { __schema: 'about-us' }
}));
jest.mock('~/validators/pagesSchemas/pages/privacy-policy.schema', () => ({
  createPrivacyPolicyPageSchema: jest.fn(() => ({ __schema: 'privacy-policy' })),
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
  createArtistryPageSchema: jest.fn(() => ({ __schema: 'artistry' })),
  ArtistryPageSchema: { __schema: 'artistry' }
}));
jest.mock('~/validators/pagesSchemas/pages/war-in-ukraine.schema', () => ({
  createWarInUkrainePageSchema: jest.fn(() => ({ __schema: 'war-in-ukraine' })),
  WarInUkrainePageSchema: { __schema: 'war-in-ukraine' }
}));
jest.mock('~/validators/pagesSchemas/pages/archive.schema', () => ({
  ArchivePageSchema: { __schema: 'archive' }
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
import { createAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { createArtistryPageSchema } from '~/validators/pagesSchemas/pages/artistry.schema';
import { createPrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { createWarInUkrainePageSchema } from '~/validators/pagesSchemas/pages/war-in-ukraine.schema';

describe('SchemaFactory', () => {
  const locale: Locale = 'uk';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['about-us', 'about-us', createAboutUsPageSchema],
    ['privacy-policy', 'privacy-policy', createPrivacyPolicyPageSchema],
    ['research', 'research', null],
    ['biography', 'biography', null],
    ['cooperation', 'cooperation', null],
    ['artistry', 'artistry', createArtistryPageSchema],
    ['war-in-ukraine', 'war-in-ukraine', createWarInUkrainePageSchema]
  ] as const)('returns localized schema for slug "%s"', (slug, tag, createSchema) => {
    const schema = SchemaFactory(slug as PageSlug, locale);

    if (createSchema) {
      expect(createSchema).toHaveBeenCalledWith(locale);
    }

    expect(LocalizeSchema).toHaveBeenCalledWith(expect.objectContaining({ __schema: tag }), locale);
    expect(schema).toEqual({ __schema: tag, locale });
  });

  it('returns localized archive schema with allowEmptyFields for description', () => {
    const schema = SchemaFactory('archive', locale);

    expect(LocalizeSchema).toHaveBeenCalledWith(expect.objectContaining({ __schema: 'archive' }), locale, {
      allowEmptyFields: ['description']
    });
    expect(schema).toEqual({ __schema: 'archive', locale });
  });

  it('returns undefined for unknown slug', () => {
    expect(SchemaFactory('unknown' as unknown as PageSlug, locale)).toBeUndefined();
  });
});
