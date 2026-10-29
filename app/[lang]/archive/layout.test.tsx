import { render, screen } from '@testing-library/react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import ArchiveLayout, { generateMetadata } from './layout';

import { resolvePageData } from '~/services/pages-data/resolvePageData';

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(),
  setRequestLocale: jest.fn()
}));

describe('ArchiveLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getTranslations as jest.Mock).mockResolvedValue((key: string) => key);
  });

  it('should generate correct metadata with fallback when CMS data is empty', async () => {
    (resolvePageData as jest.Mock).mockResolvedValueOnce({
      isError: false,
      value: null
    });

    const mockParams = Promise.resolve({ lang: 'uk' as const });
    const metadata = await generateMetadata({ params: mockParams, searchParams: Promise.resolve({}) });

    expect(setRequestLocale).toHaveBeenCalledWith('uk');
    expect(metadata).toBeDefined();
    expect(metadata.title).toBeDefined();
  });

  it('should generate metadata from CMS when page data is available', async () => {
    const mockCmsData = {
      title: { uk: 'Архів CMS', en: 'Archive CMS' },
      description: { uk: 'Опис архіву', en: 'Archive description' }
    };

    (resolvePageData as jest.Mock).mockResolvedValueOnce({
      isError: false,
      ok: true,
      data: mockCmsData,
      value: mockCmsData
    });

    const mockParams = Promise.resolve({ lang: 'uk' as const });
    const metadata = await generateMetadata({ params: mockParams, searchParams: Promise.resolve({}) });

    expect(metadata).toBeDefined();
    expect(metadata.title).toBe('Архів CMS');
    expect(metadata.description).toBe('Опис архіву');
  });

  it('should render children correctly', () => {
    const TestComponent = () => <div data-testid="child">Archive Content</div>;

    render(
      <ArchiveLayout>
        <TestComponent />
      </ArchiveLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Archive Content')).toBeInTheDocument();
  });
});
