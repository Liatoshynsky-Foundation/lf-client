import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import FundDetailsPage from './page';

type FundDetailsClientProps = {
  fundId: number;
  locale: string;
  fundSummaryBacklinkUrl: string;
  fundSummaryBacklinkText: string;
};

let fundDetailsClientProps: FundDetailsClientProps | undefined;

jest.mock('~/shared/components/blocks/fund-summary-header/FundSummaryHeader.content', () => ({
  fundSummaryBacklinkText: { uk: 'Назад', en: 'Back' },
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

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

jest.mock('./FundDetailsClient', () => ({
  __esModule: true,
  default: (props: FundDetailsClientProps) => {
    fundDetailsClientProps = props;
    return <div data-testid="fund-details-client">Fund Details Client</div>;
  }
}));

describe('FundDetailsPage', () => {
  const mockParams = { lang: 'uk', fund: '123' };

  beforeEach(() => {
    jest.clearAllMocks();
    fundDetailsClientProps = undefined;
  });

  it('should trigger notFound() if fund ID is NaN (lines 31-33)', async () => {
    const params = Promise.resolve({ lang: 'uk', fund: 'abc' });
    await FundDetailsPage({ params });
    expect(notFound).toHaveBeenCalled();
  });

  it('should trigger notFound() if fund ID is not a positive integer', async () => {
    await FundDetailsPage({ params: Promise.resolve({ lang: 'uk', fund: '0' }) });
    await FundDetailsPage({ params: Promise.resolve({ lang: 'uk', fund: '1.5' }) });

    expect(notFound).toHaveBeenCalledTimes(2);
  });

  it('should render the client fund details page with parsed route params', async () => {
    const ui = await FundDetailsPage({ params: Promise.resolve(mockParams) });
    render(ui);

    expect(setRequestLocale).toHaveBeenCalledWith('uk');
    expect(screen.getByTestId('fund-details-client')).toBeInTheDocument();
    expect(fundDetailsClientProps).toEqual({
      fundId: 123,
      locale: 'uk',
      fundSummaryBacklinkUrl: '/mock-url',
      fundSummaryBacklinkText: 'Назад'
    });
  });
});
