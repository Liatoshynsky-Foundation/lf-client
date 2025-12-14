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

jest.mock('~/validators/constants', () => {
  const NoOp = (s: any) => s;
  return {
    LocalizeSchema: jest.fn((schema: any, locale: Locale) => ({ __schema: schema.__schema, locale })),
    NoTime: NoOp,
    NoIDSchema: NoOp,
    NoPageType: NoOp
  };
});

import { LocalizeSchema } from '~/validators/constants';
import { AboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { BiographyPageSchema } from '~/validators/pagesSchemas/pages/biography.schema';
import { PrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { ResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

describe('SchemaFactory', () => {
  const locale: Locale = 'uk';

  it.each([
    ['about-us', 'about-us', AboutUsPageSchema],
    ['privacy-policy', 'privacy-policy', PrivacyPolicyPageSchema],
    ['research', 'research', ResearchPageSchema],
    ['biography', 'biography', BiographyPageSchema]
  ] as const)('returns schema for slug "%s"', (slug, tag, schemaConst) => {
    const schema = SchemaFactory(slug as PageSlug, locale);

    expect(LocalizeSchema).toHaveBeenCalledWith(expect.objectContaining(schemaConst), locale);
    expect(schema).toEqual({ __schema: tag, locale });
  });

  it('returns undefined for unknown slug', () => {
    expect(SchemaFactory('unknown' as unknown as PageSlug, locale)).toBeUndefined();
  });
});
