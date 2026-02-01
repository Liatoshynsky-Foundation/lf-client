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

jest.mock('~/validators/constants', () => {
  const NoOp = (s: any) => s;
  return {
    NoTime: NoOp,
    NoIDSchema: NoOp,
    NoPageType: NoOp
  };
});

jest.mock('~/validators/localization', () => {
  return {
    LocalizeSchema: jest.fn((schema: any, locale: Locale) => ({ __schema: schema.__schema, locale }))
  };
});

import { LocalizeSchema } from '~/validators/localization';
import { AboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { BiographyPageSchema } from '~/validators/pagesSchemas/pages/biography.schema';
import { CooperationPageSchema } from '~/validators/pagesSchemas/pages/cooperation.schema';
import { PrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { ResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

describe('SchemaFactory', () => {
  const locale: Locale = 'uk';

  it.each([
    ['about-us', 'about-us', AboutUsPageSchema],
    ['privacy-policy', 'privacy-policy', PrivacyPolicyPageSchema],
    ['research', 'research', ResearchPageSchema],
    ['biography', 'biography', BiographyPageSchema],
    ['cooperation', 'cooperation', CooperationPageSchema]
  ] as const)('returns schema for slug "%s"', (slug, tag, schemaConst) => {
    const schema = SchemaFactory(slug as PageSlug, locale);

    expect(LocalizeSchema).toHaveBeenCalledWith(expect.objectContaining(schemaConst), locale);
    expect(schema).toEqual({ __schema: tag, locale });
  });

  it('returns undefined for unknown slug', () => {
    expect(SchemaFactory('unknown' as unknown as PageSlug, locale)).toBeUndefined();
  });
});
