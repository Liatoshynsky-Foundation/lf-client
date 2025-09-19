import { render, screen } from '@testing-library/react';
import React from 'react';

import { PageNotFound } from './page-not-found/PageNotFound';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations: Record<string, string> = {
      goHome: '"Return to home',
      'pageNotFound.errorTitle': 'OoPs!',
      'pageNotFound.errorMessage': 'The page you are looking for does not exist, search again on the main page'
    };

    return translations[key];
  })
}));

describe('NotFound', () => {
  it('should render NotFound page', async () => {
    render(await PageNotFound());
    expect(await screen.findByText(/OoPs!/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/The page you are looking for does not exist, search again on the main page/i)
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /"Return to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
