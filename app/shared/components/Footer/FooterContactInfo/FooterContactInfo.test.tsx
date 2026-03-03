import { render, screen } from '@testing-library/react';
import React from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import FooterContactInfo from './FooterContactInfo';

jest.mock('~/hooks/use-breakpoints/useBreakpoints');

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, ...props }: { Component: React.ComponentType }) => <Component {...props} />
}));

const mockedUseBreakpoints = useBreakpoints as jest.Mock;

const contacts = {
  foundationName: 'Test Title',
  address: '123 Test St, Test City, TX 12345',
  phone: '123-456-7890',
  email: 'test@example.com'
};

const labels = {
  phoneLabel: 'Phone'
};

const alertMsg = 'Copied';

describe('FooterContactInfo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on desktop', () => {
    beforeEach(() => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: false });
      render(<FooterContactInfo labels={labels} contacts={contacts} alertMsg={alertMsg} />);
    });

    it('renders all contact information', () => {
      expect(screen.getByText(contacts.foundationName)).toBeInTheDocument();
      expect(screen.getByText(contacts.phone)).toBeInTheDocument();
      expect(screen.getByText(contacts.email)).toBeInTheDocument();
      expect(screen.getByText(contacts.address)).toBeInTheDocument();
      expect(screen.getByText(/Phone:/i)).toBeInTheDocument();
    });

    it('renders email as mailto link', () => {
      const emailLink = screen.getByRole('link', {
        name: contacts.email
      });

      expect(emailLink).toHaveAttribute('href', `mailto:${contacts.email}`);
    });

    it('renders phone as tel link', () => {
      const phoneLink = screen.getByRole('link', {
        name: contacts.phone
      });

      expect(phoneLink).toHaveAttribute('href', `tel:${contacts.phone}`);
    });
  });

  describe('on mobile', () => {
    beforeEach(() => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: true });
      render(<FooterContactInfo labels={labels} contacts={contacts} alertMsg={alertMsg} />);
    });

    it('renders mailto email link with correct href', () => {
      const emailLink = screen.getByRole('link', {
        name: contacts.email
      });

      expect(emailLink).toHaveAttribute('href', `mailto:${contacts.email}`);
    });

    it('renders tel phone link with correct href', () => {
      const phoneLink = screen.getByRole('link', {
        name: contacts.phone
      });

      expect(phoneLink).toHaveAttribute('href', `tel:${contacts.phone}`);
    });
  });
});
