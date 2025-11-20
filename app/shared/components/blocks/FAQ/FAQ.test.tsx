import { act, fireEvent, render, screen } from '@testing-library/react';
import { ComponentType } from 'react';

import Faq from './FAQ';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());

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

  it('should copy phone when clicking CopyButton', async () => {
    render(<Faq data={mockFaqData} />);

    const copyButton = screen.getAllByTestId('CopyButton')[0];

    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockFaqData.contacts.phone);
  });

  it('should use tel: link when on mobile', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });
    render(<Faq data={mockFaqData} />);
    const phoneLink = screen.getByText(mockFaqData.contacts.phone);
    expect(phoneLink.closest('a')).toHaveAttribute('href', `tel:${mockFaqData.contacts.phone}`);
  });

  it('should render email as mailto link on desktop', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false });
    render(<Faq data={mockFaqData} />);

    const emailLink = screen.getByRole('link', { name: mockFaqData.contacts.email });
    expect(emailLink).toHaveAttribute('href', `mailto:${mockFaqData.contacts.email}`);
  });

  it('should render email as link on mobile', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });
    render(<Faq data={mockFaqData} />);
    const emailLink = screen.getByText(mockFaqData.contacts.email).closest('a');
    expect(emailLink).not.toBeNull();
    expect(emailLink).toHaveAttribute('href', `mailto:${mockFaqData.contacts.email}`);
  });
});
