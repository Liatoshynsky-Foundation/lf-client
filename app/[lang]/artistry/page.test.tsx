import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Artistry, { generateMetadata } from './page';
import * as envUtils from '~/utils/isProductionMode';

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

describe('Artistry Page', () => {
  const mockParams = Promise.resolve({ lang: 'en' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockParams } as any);
    expect(metadata.title).toBe('title');
    expect(metadata.description).toBe('description');
  });

  it('should render UnderDevelopment in production mode', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);

    const ui = await Artistry({ params: mockParams } as any);
    render(ui);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
  });

  it('should render page content via PageBuilder and BlockRenderer in dev mode', async () => {
    const ui = await Artistry({ params: mockParams } as any);
    render(ui);
    expect(screen.getByTestId('mock-page-builder')).toBeInTheDocument();
    expect(screen.getByTestId('title-with-quote')).toBeInTheDocument();
    expect(screen.getByTestId('music-table')).toBeInTheDocument();
  });
});
