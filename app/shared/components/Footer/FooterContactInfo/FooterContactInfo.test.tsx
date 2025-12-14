import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import FooterContactInfo from './FooterContactInfo';

jest.mock('~/hooks/use-breakpoints/useBreakpoints');

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, ...props }: { Component: React.ComponentType }) => <Component {...props} />
}));

jest.mock('~/ds-components/copy-link/CopyLink');

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
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on desktop', () => {
    beforeEach(() => {
      const { setMockIsMobile } = jest.requireMock('~/ds-components/copy-link/CopyLink');
      setMockIsMobile(false);

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

    it('renders email as copyable element on desktop', () => {
      const copyLinks = screen.getAllByTestId('mock-copy-link');
      const emailCopyLink = copyLinks.find((link) => link.textContent === contacts.email);
      expect(emailCopyLink).toBeInTheDocument();
      expect(emailCopyLink).toHaveTextContent(contacts.email);
    });

    it('copies phone on CopyLink click', async () => {
      const user = userEvent.setup();
      const writeSpy = jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();

      const copyLinks = screen.getAllByTestId('mock-copy-link');
      const phoneCopyLink = copyLinks.find((link) => link.textContent === contacts.phone);

      expect(phoneCopyLink).toBeDefined();
      if (phoneCopyLink) {
        await user.click(phoneCopyLink);
      }

      expect(writeSpy).toHaveBeenCalledWith(contacts.phone);
      writeSpy.mockRestore();
    });
  });

  describe('on mobile', () => {
    beforeEach(() => {
      const { setMockIsMobile } = jest.requireMock('~/ds-components/copy-link/CopyLink');
      setMockIsMobile(true);
      mockedUseBreakpoints.mockReturnValue({ isMobile: true });
      render(<FooterContactInfo labels={labels} contacts={contacts} alertMsg={alertMsg} />);
    });

    it('renders mailto email link with correct href', () => {
      const emailLink = screen.getByRole('link', { name: contacts.email });
      expect(emailLink).toHaveAttribute('href', `mailto:${contacts.email}`);
    });

    it('renders tel phone link with correct href', () => {
      const phoneLink = screen.getByRole('link', { name: contacts.phone });
      expect(phoneLink).toHaveAttribute('href', `tel:${contacts.phone}`);
    });

    it('does not render copy button on mobile', () => {
      const copyLinks = screen.getAllByTestId('mock-copy-link');
      expect(copyLinks.length).toBeGreaterThan(0);
      copyLinks.forEach((link) => {
        expect(link.tagName).toBe('A');
      });
    });
  });
});
