import { render, screen } from '@testing-library/react';

import Artistry from './page';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/components/title-with-quote/TitleWithQuote', () => {
  const MockLiatoshynskyArtistry = () => <div>Liatoshynksy artistry</div>;
  MockLiatoshynskyArtistry.displayName = 'MockLiatoshynskyArtistry';
  return MockLiatoshynskyArtistry;
});

jest.mock('~/components/tables/CompositionTable/MusicTableSelection', () => {
  const MockCompositionTable = () => <div>Composition table</div>;
  MockCompositionTable.displayName = 'MockCompositionTable';
  return MockCompositionTable;
});

jest.mock('~/di/container', () => ({
  createRequestContainer: () => ({
    resolve: () => ({
      getAllCompositions: jest
        .fn()
        .mockResolvedValue([{ id: '1', name: 'Test', year: 2000, audioAvailable: true, sheetAvailable: false }])
    })
  })
}));

describe('Liatoshynsky artistry page', () => {
  it('should render Liatoshynsky artistry page correctly', async () => {
    render(await Artistry({ params: Promise.resolve({ lang: 'en' }) }));

    expect(screen.getByText(/Liatoshynksy artistry/i)).toBeInTheDocument();
    expect(screen.getByText(/Composition table/i)).toBeInTheDocument();
  });
});
