import { act, fireEvent, render, screen } from '@testing-library/react';
import { ComponentType } from 'react';

import Faq from './FAQ';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());

jest.mock('~/ds-components/copy-link/CopyLink');
const { setMockIsMobile } = jest.requireMock('~/ds-components/copy-link/CopyLink');

jest.mock('next-intl', () => ({
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
  faq: [
    { title: 'Question 1', content: 'Answer 1' },
    { title: 'Question 2', content: 'Answer 2' }
  ]
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

  it('should render the section title and subtitles', () => {
    render(<Faq data={mockFaqData} />);
    expect(screen.getByText('FAQ Title')).toBeInTheDocument();
    expect(screen.getByText('Have a question?')).toBeInTheDocument();
    expect(screen.getByText('Here is the answer')).toBeInTheDocument();
  });

  it('should render FAQ items', () => {
    render(<Faq data={mockFaqData} />);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
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
