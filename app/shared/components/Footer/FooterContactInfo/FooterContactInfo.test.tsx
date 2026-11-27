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

  it('hides empty contact values and their labels without hiding populated contacts', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: false });
    render(
      <FooterContactInfo
        labels={labels}
        alertMsg={alertMsg}
        contacts={{
          foundationName: '  ',
          address: null,
          phone: '123-456-7890',
          email: ''
        }}
      />
    );

    expect(screen.getByRole('link', { name: contacts.phone })).toHaveAttribute('href', `tel:${contacts.phone}`);
    expect(screen.queryByText('  ')).not.toBeInTheDocument();
    expect(screen.queryByText('123 Test St, Test City, TX 12345')).not.toBeInTheDocument();
    expect(screen.queryByText('Email:')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: contacts.email })).not.toBeInTheDocument();
  });

  it('hides the contact component when every contact is empty', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: false });
    const { container } = render(
      <FooterContactInfo
        labels={labels}
        alertMsg={alertMsg}
        contacts={{ foundationName: null, address: ' \n ', phone: undefined, email: '' }}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('shows a Ukrainian phone number with spaces while keeping its tel link compact', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: false });
    render(
      <FooterContactInfo labels={labels} alertMsg={alertMsg} contacts={{ ...contacts, phone: '+380671234567' }} />
    );

    const phoneLink = screen.getByRole('link', { name: '+38 067 123 4567' });
    expect(phoneLink).toHaveAttribute('href', 'tel:+380671234567');
  });
});
