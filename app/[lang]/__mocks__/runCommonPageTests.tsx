import { render, screen } from '@testing-library/react';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Language } from '~/types/types/language';

import { createSeoMeta } from '~/lib/utils/createSeoMeta';
import PageBuilder from '~/shared/components/page-builder/PageBuilder';

jest.mock('~/shared/components/page-builder/PageBuilder');

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: jest.fn()
}));

jest.mock('~/utils/createSeoMeta', () => ({
  createSeoMeta: jest.fn((meta) => meta)
}));

jest.mock('~/shared/components/constants/routes', () => ({
  ROUTES: {
    PRIVACY_POLICY: '/privacy-policy',
    HOME: '/'
  }
}));

export const testPassLangSlugToPageBuilder = async (
  PageComponent: ({ params }: Readonly<Language>) => Promise<React.JSX.Element>,
  slug: string,
  lang: 'uk' | 'en' = 'uk'
) => {
  const ui = await PageComponent({
    params: Promise.resolve({
      lang
    })
  });

  render(ui);

  expect(PageBuilder).toHaveBeenCalledWith(
    expect.objectContaining({
      lang,
      slug,
      renderBlock: expect.any(Function)
    }),
    undefined
  );
  expect(screen.getByTestId('pagebuilder')).toBeInTheDocument();
  expect(screen.getByTestId('pagebuilder-lang')).toHaveTextContent(JSON.stringify(lang));
  expect(screen.getByTestId('pagebuilder-slug')).toHaveTextContent(JSON.stringify(slug));
};

export const testGeneratePageMetadata = async (
  generateMetadata: (params: Readonly<Language>) => Promise<Metadata>,
  translationKey: string,
  expectedUrl: string
) => {
  const mockT = jest.fn((key) => `translated_${key}`);
  (getTranslations as jest.Mock).mockResolvedValueOnce(mockT);
  const meta = await generateMetadata({ params: Promise.resolve({ lang: 'en' }) });
  expect(setRequestLocale).toHaveBeenCalledWith('en');

  expect(getTranslations).toHaveBeenCalledWith(translationKey);

  expect(mockT).toHaveBeenCalledWith('title');
  expect(mockT).toHaveBeenCalledWith('description');

  expect(createSeoMeta).toHaveBeenCalledWith({
    title: 'translated_title',
    description: 'translated_description',
    url: expectedUrl,
    locale: 'en'
  });

  expect(meta).toEqual({
    title: 'translated_title',
    description: 'translated_description',
    url: expectedUrl,
    locale: 'en'
  });
};
