import { Locale } from 'next-intl';

import { selectSchema } from './selectSchema';

jest.mock('~/validators/pagesSchemas/pages/about-us.schema', () => ({
  createLocalizedAboutUsPageSchema: jest.fn().mockImplementation((locale: Locale) => ({ __schema: 'about-us', locale }))
}));
jest.mock('~/validators/pagesSchemas/pages/privacy-policy.schema', () => ({
  createLocalizedPrivacyPolicyPageSchema: jest
    .fn()
    .mockImplementation((locale: Locale) => ({ __schema: 'privacy-policy', locale }))
}));
jest.mock('~/validators/pagesSchemas/pages/research.schema', () => ({
  createLocalizedResearchPageSchema: jest
    .fn()
    .mockImplementation((locale: Locale) => ({ __schema: 'research', locale }))
}));

import { createLocalizedAboutUsPageSchema } from '~/validators/pagesSchemas/pages/about-us.schema';
import { createLocalizedPrivacyPolicyPageSchema } from '~/validators/pagesSchemas/pages/privacy-policy.schema';
import { createLocalizedResearchPageSchema } from '~/validators/pagesSchemas/pages/research.schema';

describe('selectSchema', () => {
  const locale: Locale = 'uk';

  it.each([
    ['about-us', 'about-us', createLocalizedAboutUsPageSchema],
    ['privacy-policy', 'privacy-policy', createLocalizedPrivacyPolicyPageSchema],
    ['research', 'research', createLocalizedResearchPageSchema]
  ] as const)('returns schema for slug "%s"', (slug, tag, factory) => {
    const schema = selectSchema(slug, locale);

    expect(factory).toHaveBeenCalledWith(locale);
    expect(schema).toEqual({ __schema: tag, locale });
  });

  it('returns undefined for unknown slug', () => {
    expect(selectSchema('unknown', locale)).toBeUndefined();
  });
});
