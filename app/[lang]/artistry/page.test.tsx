import { render, screen } from '@testing-library/react';

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
  const MockTitle = () => <div>Liatoshynksy artistry</div>;
  MockTitle.displayName = 'TitleWithQuote';
  return MockTitle;
});

jest.mock('~/components/tables/CompositionTable/MusicTableSection', () => {
  const MockMusicTable = () => <div>Composition table</div>;
  MockMusicTable.displayName = 'MusicTableSection';
  return MockMusicTable;
});

jest.mock('~/components/under-development/UnderDevelopment', () => {
  const MockUnderDev = () => <div data-testid="under-dev">Under Development</div>;
  MockUnderDev.displayName = 'UnderDevelopment';
  return MockUnderDev;
});

jest.mock('~/layouts/main-layout/MainLayout', () => {
  const MockLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockLayout.displayName = 'MainLayout';
  return MockLayout;
});

describe('Artistry Page', () => {
  const mockParams = Promise.resolve({ lang: 'en' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockParams });
    expect(metadata).toBeDefined();
  });

  it('should render UnderDevelopment in production mode', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);

    const ui = await Artistry({ params: mockParams });
    render(ui);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
  });

  it('should render page content correctly in dev mode', async () => {
    const ui = await Artistry({ params: mockParams });
    render(ui);

    expect(screen.getByText(/Liatoshynksy artistry/i)).toBeInTheDocument();
    expect(screen.getByText(/Composition table/i)).toBeInTheDocument();
  });
});
