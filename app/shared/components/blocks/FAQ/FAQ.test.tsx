import { act, fireEvent, render, screen } from '@testing-library/react';
import { ComponentType } from 'react';

import Faq from './FAQ';
import { faqItems } from './FAQ.consts';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());

jest.mock('~/ds-components/copy-link/CopyLink');
const mockCopyLinkModule = jest.requireMock('~/ds-components/copy-link/CopyLink') as {
  setMockIsMobile: (val: boolean) => void;
};
const { setMockIsMobile } = mockCopyLinkModule;

jest.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: 'FAQ Title',
      'subtitle.question': 'Have a question?',
      'subtitle.answer': 'Here is the answer',
      phoneCopiedAlert: 'Phone copied!'
    };

    return translations[key] || key;
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
  },
  faq: faqItems as unknown as { title: { en: string; uk: string }; content: { en: string; uk: string } }[]
};

describe('FAQ component', () => {
  beforeEach(() => {
    setMockIsMobile(false);
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false });
    jest.spyOn(window.navigator.clipboard, 'writeText').mockResolvedValue();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the section title and subtitles and read constants', async () => {
    const { initFaqBabelCoverage } = await import('./FAQ.consts');
    initFaqBabelCoverage();

    expect(faqItems).toBeDefined();
    expect(faqItems.length).toBeGreaterThan(0);

    render(<Faq data={mockFaqData} />);

    expect(screen.getByText('FAQ Title')).toBeInTheDocument();
    expect(screen.getByText('Have a question?')).toBeInTheDocument();
    expect(screen.getByText('Here is the answer')).toBeInTheDocument();
  });

  it('should render FAQ items', () => {
    expect(faqItems).toContainEqual(
      expect.objectContaining({
        title: expect.any(Object),
        content: expect.any(Object)
      })
    );

    render(<Faq data={mockFaqData} />);
    const firstItem = faqItems[0];
    if (firstItem && firstItem.title && firstItem.content) {
      expect(screen.getByText(String(firstItem.title.en))).toBeInTheDocument();
      expect(screen.getAllByText(String(firstItem.content.en))).not.toHaveLength(0);
    }
  });

  it('should copy phone when clicking CopyLink', async () => {
    render(<Faq data={mockFaqData} />);

    const copyLinks = screen.getAllByTestId('mock-copy-link');
    const phoneCopyLink = copyLinks.find((link) => link.textContent === mockFaqData.contacts.phone);

    await act(async () => {
      if (phoneCopyLink) {
        fireEvent.click(phoneCopyLink);
      }
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockFaqData.contacts.phone);
  });

  it('should use tel: link when on mobile', () => {
    setMockIsMobile(true);
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });
    render(<Faq data={mockFaqData} />);
    const phoneLink = screen.getByText(mockFaqData.contacts.phone);
    expect(phoneLink.closest('a')).toHaveAttribute('href', `tel:${mockFaqData.contacts.phone}`);
  });

  it('should render email as copyable element on desktop', () => {
    render(<Faq data={mockFaqData} />);

    const copyLinks = screen.getAllByTestId('mock-copy-link');
    const emailCopyLink = copyLinks.find((link) => link.textContent === mockFaqData.contacts.email);
    expect(emailCopyLink).toBeInTheDocument();
    expect(emailCopyLink).toHaveTextContent(mockFaqData.contacts.email);
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
