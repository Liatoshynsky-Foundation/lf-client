import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { testPassDraftIdToResolvePageData } from '../__mocks__/runCommonPageTests';
import Artistry, { generateMetadata } from './page';
import * as envUtils from '~/utils/isProductionMode';

import { resolvePageData } from '~/services/pages-data/resolvePageData';

jest.mock('~/services/pages-data/resolvePageData', () => ({
  resolvePageData: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('~/components/title-with-quote/TitleWithQuote', () => {
  const MockTitle = () => <div data-testid="title-with-quote">Liatoshynksy artistry</div>;
  MockTitle.displayName = 'TitleWithQuote';
  return MockTitle;
});

jest.mock('~/components/tables/CompositionTable/MusicTableSection', () => {
  const MockMusicTable = () => <div data-testid="music-table">Composition table</div>;
  MockMusicTable.displayName = 'MusicTableSection';
  return MockMusicTable;
});

jest.mock('~/components/under-development/UnderDevelopment', () => {
  const MockUnderDev = () => <div data-testid="under-dev">Under Development</div>;
  MockUnderDev.displayName = 'UnderDevelopment';
  return MockUnderDev;
});

jest.mock('~/shared/components/page-builder/PageBuilder', () => {
  return function MockPageBuilder({ renderBlock }: any) {
    const mockBlocksData = {
      TitleWithQuote: { title: 'Mock Title' },
      MusicTableSection: {}
    };

    return (
      <div data-testid="mock-page-builder">
        {renderBlock({
          blockId: 'title-with-quote',
          blocks: mockBlocksData,
          uniqueRenderKey: 'key-1'
        })}
        {renderBlock({
          blockId: 'music-table',
          blocks: mockBlocksData,
          uniqueRenderKey: 'key-2'
        })}
      </div>
    );
  };
});

jest.mock('~/lib/utils/getDraftId', () => ({
  getDraftId: jest.fn()
}));

describe('Artistry Page', () => {
  const mockParams = Promise.resolve({ lang: 'en' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate correct metadata with fallback', async () => {
    (resolvePageData as jest.Mock).mockResolvedValueOnce({
      isError: false,
      ok: true,
      data: null,
      value: null
    });

    const metadata = await generateMetadata({ params: mockParams, searchParams: Promise.resolve({}) });
    expect(metadata.title).toBe('title');
  });

  it('should generate metadata with CMS SEO values', async () => {
    const artistryCmsRecord = {
      title: 'Творчість Кастомна',
      description: 'Опис блоку творчості',
      canonicalUrl: '/artistry-direct-link',
      allowIndexation: true
    };

    (resolvePageData as jest.Mock).mockResolvedValueOnce({
      isError: false,
      ok: true,
      data: artistryCmsRecord,
      value: artistryCmsRecord
    });

    const meta = await generateMetadata({
      params: Promise.resolve({ lang: 'uk' as const }),
      searchParams: Promise.resolve({})
    });

    expect(meta).toMatchObject({
      title: 'Творчість Кастомна',
      description: 'Опис блоку творчості',
      robots: 'index, follow'
    });
  });

  it('should render UnderDevelopment in production mode', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);

    const ui = await Artistry({ params: mockParams } as any);
    render(ui);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
  });

  it('should fallback to default metadata when data resolution fails with error', async () => {
    (resolvePageData as jest.Mock).mockResolvedValueOnce({
      isError: true,
      error: new Error('Network timeout for Artistry')
    });

    const res = await generateMetadata({
      params: Promise.resolve({ lang: 'uk' as const }),
      searchParams: Promise.resolve({})
    });
    expect(res.title).toBe('title');
  });

  it('should render page content via PageBuilder and BlockRenderer in dev mode', async () => {
    const ui = await Artistry({ params: mockParams } as any);
    render(ui);
    expect(screen.getByTestId('mock-page-builder')).toBeInTheDocument();
    expect(screen.getByTestId('title-with-quote')).toBeInTheDocument();
    expect(screen.getByTestId('music-table')).toBeInTheDocument();
  });

  it('should pass the draft ID to resolvePageData', async () => {
    await testPassDraftIdToResolvePageData(generateMetadata, 'artistry', 'draft-123');
  });
});
