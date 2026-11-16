import { fireEvent, render, screen } from '@testing-library/react';
import { ComponentType } from 'react';

import Faq from './FAQ';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());

jest.mock('~/ds-components/copy-link/CopyLink');
const mockCopyLinkModule = jest.requireMock('~/ds-components/copy-link/CopyLink') as {
  setMockIsMobile: (val: boolean) => void;
};
const { setMockIsMobile } = mockCopyLinkModule;

let currentLocale = 'en';

jest.mock('next-intl', () => ({
  useLocale: () => currentLocale,
  useTranslations: () => {
    const translations: Record<string, string> = {
      title: 'FAQ Title',
      'subtitle.question': 'Have a question?',
      'subtitle.answer': 'Here is the answer',
      phoneCopiedAlert: 'Phone copied!',
      'items.refund.title': 'Refund question',
      'items.refund.content': 'Refund answer'
    };

    const translate = (key: string) => translations[key] || key;
    translate.rich = (key: string) => translations[key] || key;

    return translate;
  }
}));

jest.mock('~/shared/hooks/is-mounted/useIsMounted', () => ({
  useIsMounted: () => true
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn()
  }
});

jest.mock('~/public/icons/phone.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="phone-icon" />
}));

jest.mock('~/public/icons/mail.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="mail-icon" />
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, alt }: { Component: ComponentType; alt?: string }) => (
    <div data-testid="svg-wrapper">
      <Component />
      {alt}
    </div>
  )
}));

const mockFaqData = {
  contacts: {
    phone: '+3800000000',
    email: 'test@email.com'
  }
};

describe('FAQ component', () => {
  beforeEach(() => {
    currentLocale = 'en';
    setMockIsMobile(false);
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false });
    jest.spyOn(window.navigator.clipboard, 'writeText').mockResolvedValue();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the section title, subtitles, and translated FAQ item', () => {
    render(<Faq data={mockFaqData} />);

    expect(screen.getByText('FAQ Title')).toBeInTheDocument();
    expect(screen.getByText('Have a question?')).toBeInTheDocument();
    expect(screen.getByText('Here is the answer')).toBeInTheDocument();
    expect(screen.getByText('Refund question')).toBeInTheDocument();
    expect(screen.getByText('Refund answer')).toBeInTheDocument();
  });

  it('should copy phone when clicking CopyLink', () => {
    render(<Faq data={mockFaqData} />);

    const copyLinks = screen.getAllByTestId('mock-copy-link');
    const phoneCopyLink = copyLinks.find((link) => link.textContent === mockFaqData.contacts.phone);

    if (phoneCopyLink) {
      fireEvent.click(phoneCopyLink);
    }

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockFaqData.contacts.phone);
  });

  it('should copy email when clicking email CopyLink on desktop', () => {
    render(<Faq data={mockFaqData} />);

    const copyLinks = screen.getAllByTestId('mock-copy-link');
    const emailCopyLink = copyLinks.find((link) => link.textContent === mockFaqData.contacts.email);

    expect(emailCopyLink).toBeInTheDocument();

    if (emailCopyLink) {
      fireEvent.click(emailCopyLink);
    }

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockFaqData.contacts.email);
  });

  it('should use tel: link when on mobile', () => {
    setMockIsMobile(true);
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });
    render(<Faq data={mockFaqData} />);
    const phoneLink = screen.getByText(mockFaqData.contacts.phone);
    expect(phoneLink.closest('a')).toHaveAttribute('href', `tel:${mockFaqData.contacts.phone}`);
  });

  it('should render email as link on mobile', () => {
    setMockIsMobile(true);
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });
    render(<Faq data={mockFaqData} />);
    const emailLink = screen.getByText(mockFaqData.contacts.email).closest('a');
    expect(emailLink).not.toBeNull();
    expect(emailLink).toHaveAttribute('href', `mailto:${mockFaqData.contacts.email}`);
  });
});
