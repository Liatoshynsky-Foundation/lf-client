import { render, screen } from '@testing-library/react';
import React from 'react';

import NotFoundPage from './not-found';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations: Record<string, string> = {
      languageNotFound: '404 Language',
      goHome: 'go home'
    };
    return translations[key];
  })
}));

describe('NotFound', () => {
  it('should render NotFound page', async () => {
    render(await NotFoundPage());
    expect(await screen.findByText(/404 Language/i)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /go home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
