import { fireEvent, render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';

import TranslationNotFound from './TranslationNotFound';

jest.mock('~/ds-components/button/Button');

jest.mock('next/image');

const mockTranslations: Record<string, Record<string, string>> = {
  uk: {
    title: 'НеЗаБаРоМ',
    description:
      'Наш архівний кіт Філімон отримав нову роль — перекладача. Він працює над цією сторінкою, тому українська версія з’явиться дуже скоро.',
    button: 'Повернутись до англійської'
  },
  en: {
    title: 'CoMing SoOn',
    description:
      'Our archive cat Filimon has taken on a new role — translator. He’s working on this page, so the English version will appear very soon.',
    button: 'Return to Ukrainian'
  }
};

jest.mock('next-intl', () => ({
  useTranslations: jest.fn()
}));

const mockPush = jest.fn();
const mockPathname = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname()
}));

describe('TranslationNotFound', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      return mockTranslations.en[key];
    });
  });

  it('should render image and button', () => {
    mockPathname.mockReturnValueOnce('/en-US/foo/bar');

    render(<TranslationNotFound />);

    expect(screen.getByRole('img')).toBeInTheDocument();

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should redirect to same path with /uk from /en prefix when button is clicked', () => {
    mockPathname.mockReturnValueOnce('/en-US/foo/bar');

    render(<TranslationNotFound />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/uk/foo/bar');
  });

  it('should redirect from "/en" to "/uk/" (appending a trailing slash)', () => {
    mockPathname.mockReturnValueOnce('/en');

    render(<TranslationNotFound />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/uk/');
  });

  it('should redirect to same path with /en from /uk prefix when button is clicked', () => {
    mockPathname.mockReturnValueOnce('/uk/foo/bar');
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      return mockTranslations.uk[key];
    });
    render(<TranslationNotFound redirectLocale="en" />);

    expect(screen.getByText(/НеЗаБаРоМ/i)).toBeInTheDocument();
    expect(screen.getByText(/українська версія з'явиться дуже скоро/i)).toBeInTheDocument();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/en/foo/bar');
  });

  it.each([
    { locale: 'Ukrainian', code: 'uk', expectedTexts: [/НеЗаБаРоМ/i, /українська версія з'явиться дуже скоро./i] },
    { locale: 'English', code: 'en', expectedTexts: [/coming soon/i, /english version will appear very soon./i] }
  ])('should show $locale translation when locale is $code', ({ code, expectedTexts }) => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      return mockTranslations[code][key];
    });
    render(<TranslationNotFound />);
    expectedTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('should handle paths without locale prefix correctly', () => {
    mockPathname.mockReturnValueOnce('/foo/bar');

    render(<TranslationNotFound />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockPush).toHaveBeenCalledWith('/uk/foo/bar');
  });
});
