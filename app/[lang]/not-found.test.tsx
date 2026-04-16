import { render, screen } from '@testing-library/react';
import React from 'react';

import { PageNotFound } from './[...unknown-route]/page-not-found/PageNotFound';

import { ROUTES } from '~/shared/components/constants/routes';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('CustomNotFoundPage', () => {
  describe('NotFound', () => {
    it('should render NotFound page', async () => {
      render(await PageNotFound());

      expect(await screen.findByText('pageNotFound.errorTitle')).toBeInTheDocument();
      expect(await screen.findByText('pageNotFound.errorMessage')).toBeInTheDocument();

      const link = screen.getByRole('link', { name: /goHome/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', ROUTES.HOME);
    });
  });
});
