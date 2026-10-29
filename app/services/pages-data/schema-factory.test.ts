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
jest.mock('~/validators/pagesSchemas/pages/publications.schema', () => ({
  PublicationsPageSchema: { __schema: 'news' }
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
    [
      'about-us',
      'about-us',
      [
        'blocks.OurMission.list',
        'blocks.WhatWeDo.items.title',
        'blocks.WhatWeDo.items.description',
        'blocks.OurGoals.goals.title',
        'blocks.OurGoals.goals.description'
      ]
    ],
    [
      'privacy-policy',
      'privacy-policy',
      ['blocks.DataUsage.list', 'blocks.Cookies.list', 'blocks.DataWeCollect.sections.list', 'blocks.UserRights.list']
    ],
    [
      'war-in-ukraine',
      'war-in-ukraine',
      [
        'blocks.PrincipleOfHope.buttons.shortText',
        'blocks.PrincipleOfHope.buttons.fullText',
        'blocks.YermolenkoLinks.buttons.shortText',
        'blocks.YermolenkoLinks.buttons.fullText',
        'blocks.VolunteerDonation.paymentMethods.label'
      ]
    ],
    ['archive', 'archive', ['blocks.PageCaption.description']]
  ] as const)('passes allowEmptyFields for slug "%s"', (slug, tag, allowEmptyFields) => {
    const schema = SchemaFactory(slug as PageSlug, locale);

    expect(LocalizeSchema).toHaveBeenCalledWith(expect.objectContaining({ __schema: tag }), locale, {
      allowEmptyFields
    });
    expect(schema).toEqual({ __schema: tag, locale });
  });

  it.each([
    ['research', 'research'],
    ['biography', 'biography'],
    ['cooperation', 'cooperation'],
    ['artistry', 'artistry'],
    ['news', 'news']
  ] as const)('returns localized schema for slug "%s"', (slug, tag) => {
    const schema = SchemaFactory(slug as PageSlug, locale);

    expect(LocalizeSchema).toHaveBeenCalledWith(expect.objectContaining({ __schema: tag }), locale);
    expect(schema).toEqual({ __schema: tag, locale });
  });

  it.each([
    ['about-us', createAboutUsPageSchema],
    ['privacy-policy', createPrivacyPolicyPageSchema],
    ['artistry', createArtistryPageSchema],
    ['war-in-ukraine', createWarInUkrainePageSchema]
  ] as const)('calls the page schema factory with locale for "%s"', (slug, createSchema) => {
    SchemaFactory(slug, locale);

    expect(createSchema).toHaveBeenCalledWith(locale);
  });

  it('returns undefined for unknown slug', () => {
    expect(SchemaFactory('unknown' as unknown as PageSlug, locale)).toBeUndefined();
  });
});
