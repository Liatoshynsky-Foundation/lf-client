import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import RootLayout, { generateMetadata } from './layout';

jest.mock('next/headers', () => ({
  cookies: jest.fn()
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}));

jest.mock('next-intl', () => ({
  hasLocale: jest.fn(),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

jest.mock('next-intl/server', () => ({
  getTranslations: () => jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/shared/components/Header/Header.server', () => {
  const MockHeader = () => <header>Header</header>;
  MockHeader.displayName = 'Header';
  return MockHeader;
});

jest.mock('~/components/Footer/Footer', () => {
  const MockFooter = () => <footer>Footer</footer>;
  MockFooter.displayName = 'Footer';
  return MockFooter;
});

jest.mock('~/shared/components/emotion-provider/EmotionProvider', () => {
  const MockEmotion = ({ children }: any) => <>{children}</>;
  MockEmotion.displayName = 'EmotionProvider';
  return MockEmotion;
});

jest.mock('~/ds-components/theme/ThemeProvider', () => {
  const MockTheme = ({ children }: any) => <>{children}</>;
  MockTheme.displayName = 'ThemeProvider';
  return MockTheme;
});

jest.mock('~/shared/providers/QueryProvider', () => {
  const MockQuery = ({ children }: any) => <>{children}</>;
  MockQuery.displayName = 'QueryProvider';
  return MockQuery;
});

jest.mock('~/shared/context/AudioPlayerContext', () => {
  const MockAudio = ({ children }: any) => <>{children}</>;
  MockAudio.displayName = 'AudioPlayerProvider';
  return { AudioPlayerProvider: MockAudio };
});

describe('RootLayout', () => {
  const mockParams = Promise.resolve({ lang: 'uk' as any });
  const mockedHasLocale = hasLocale as unknown as jest.Mock;
  const mockedCookies = cookies as unknown as jest.Mock;
  const mockedNotFound = notFound as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedHasLocale.mockReturnValue(true);
    mockedCookies.mockReturnValue({
      get: jest.fn().mockReturnValue({ value: JSON.stringify({ consent: true }) })
    });
  });

  it('should cover initialization lines 47-72', async () => {
    const Result = await RootLayout({
      children: <div />,
      params: mockParams
    });

    expect(Result.type).toBe('html');
  });

  it('should have correct structure without failing render', async () => {
    const Result = await RootLayout({
      children: <main>Content</main>,
      params: mockParams
    });

    expect(Result.type).toBe('html');
    const body = Result.props.children.find((c: any) => c?.type === 'body');
    expect(body).toBeDefined();
  });

  it('should handle corrupted cookie consent gracefully', async () => {
    mockedCookies.mockReturnValue({
      get: jest.fn().mockReturnValue({ value: 'invalid-json' })
    });

    const Result = await RootLayout({
      children: <main>Content</main>,
      params: mockParams
    });
    expect(Result.type).toBe('html');
  });

  it('should call notFound when locale is not supported', async () => {
    mockedHasLocale.mockReturnValue(false);

    await RootLayout({
      children: <main>Content</main>,
      params: Promise.resolve({ lang: 'invalid' as any })
    });

    expect(mockedNotFound).toHaveBeenCalled();
  });

  it('should cover metadata generation', async () => {
    const params = Promise.resolve({ lang: 'uk' as any });
    const metadata = await generateMetadata({ params });

    expect(metadata).toBeDefined();
  });

  it('should work when cookie consent is missing', async () => {
    mockedCookies.mockReturnValue({
      get: jest.fn().mockReturnValue(undefined)
    });

    const Result = await RootLayout({
      children: <main>Content</main>,
      params: mockParams
    });
    expect(Result.type).toBe('html');
  });
});
