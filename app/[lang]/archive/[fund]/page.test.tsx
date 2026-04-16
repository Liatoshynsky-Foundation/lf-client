import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';

import FundDetailsPage from './page';
import * as envUtils from '~/utils/isProductionMode';

jest.mock('~/shared/components/blocks/fund-summary-header/FundSummaryHeader.content', () => ({
  fundSummaryBacklinkText: { uk: 'Назад', en: 'Back' },
  fundSummaryContent: { items: [] },
  fundSummaryTitle: { uk: 'Заголовок', en: 'Title' },
  getFundSummaryHeaderBacklinkUrl: jest.fn().mockResolvedValue('/mock-url')
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => '/mock-path'
}));
jest.mock('~/utils/isProductionMode', () => ({ isProductionMode: jest.fn() }));
jest.mock('~/components/tables/DocumentsTable/DocumentTableSection', () => ({
  __esModule: true,
  default: () => <div data-testid="document-table">Document Table Section</div>
}));
jest.mock('next-intl', () => ({
  useLocale: () => 'uk',
  useTranslations: () => (key: string) => key
}));

jest.mock('~/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="main-layout">{children}</div>
}));

jest.mock('~/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => <div data-testid="under-dev">Under Development</div>
}));

describe('FundDetailsPage', () => {
  const mockParams = { lang: 'uk', fund: '123' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger notFound() if fund ID is NaN (lines 31-33)', async () => {
    const params = Promise.resolve({ lang: 'uk', fund: 'abc' });
    await FundDetailsPage({ params });
    expect(notFound).toHaveBeenCalled();
  });

  it('should render UnderDevelopment in production mode (lines 35-37)', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);

    const ui = await FundDetailsPage({ params: Promise.resolve(mockParams) });
    render(ui);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
  });

  it('should render full page content in dev mode (lines 39-56)', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);

    const ui = await FundDetailsPage({ params: Promise.resolve(mockParams) });
    render(ui);

    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    expect(screen.getByText('Заголовок')).toBeInTheDocument();
  });
});
