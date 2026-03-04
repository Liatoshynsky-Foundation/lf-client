import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ResearchPage, { generateMetadata } from './page';
import { WrapError, WrapSuccess } from '~/types/types/result';
import * as envUtils from '~/utils/isProductionMode';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('~/services/pages-data/resolvePageData');

jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: jest.fn((err) => <div data-testid="error-page">Error: {err}</div>)
}));

jest.mock('../[...unknown-route]/page-not-found/pageNotFound', () => ({
  PageNotFound: () => <div data-testid="not-found-page">Page Not Found</div>
}));

jest.mock('~/components/research-and-scientific-work/ResearchAndScientificWork', () => {
  const MockHero = (props: any) => <div>{props?.data ? 'Hero Section' : 'No Hero'}</div>;
  MockHero.displayName = 'ResearchAndScientificWork';
  return { __esModule: true, default: MockHero };
});

jest.mock('~/components/tables/WorksTable/WorkTableSection', () => {
  const MockTable = () => <div>Work Table Section</div>;
  MockTable.displayName = 'WorkTableSection';
  return { __esModule: true, WorkTableSection: MockTable };
});

jest.mock('~/layouts/main-layout/MainLayout', () => {
  const MockLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockLayout.displayName = 'MainLayout';
  return { __esModule: true, default: MockLayout };
});

jest.mock('~/components/under-development/UnderDevelopment', () => {
  const MockUnderDev = () => <div data-testid="under-dev">Under Development</div>;
  MockUnderDev.displayName = 'UnderDevelopment';
  return { __esModule: true, default: MockUnderDev };
});

describe('Research Page', () => {
  const { resolvePageData } = jest.requireMock('~/services/pages-data/resolvePageData') as {
    resolvePageData: jest.Mock;
  };

  const mockParams = Promise.resolve({ lang: 'uk' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockParams });
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe('title');
  });

  it('should render all components when data is successfully fetched', async () => {
    resolvePageData.mockResolvedValueOnce(
      WrapSuccess({
        blocks: {
          HeroSection: { title: 'Some hero data' }
        }
      })
    );

    const ui = await ResearchPage({ params: mockParams });
    render(ui);

    expect(await screen.findByText('Hero Section')).toBeInTheDocument();
    expect(await screen.findByText('Work Table Section')).toBeInTheDocument();
    expect(resolvePageData).toHaveBeenCalledWith('research', 'uk');
  });

  it('should render only the table when hero section data is missing', async () => {
    resolvePageData.mockResolvedValueOnce(WrapSuccess({ blocks: {} }));

    const ui = await ResearchPage({ params: Promise.resolve({ lang: 'en' as const }) });
    render(ui);

    expect(screen.queryByText('Hero Section')).not.toBeInTheDocument();
    expect(await screen.findByText('Work Table Section')).toBeInTheDocument();
  });

  it('should render UnderDevelopment in production mode', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);

    const ui = await ResearchPage({ params: mockParams });
    render(ui);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
  });

  it('should render ErrorPage when page result is error', async () => {
    resolvePageData.mockResolvedValueOnce(WrapError('No page found'));

    const ui = await ResearchPage({ params: mockParams });
    render(ui);

    expect(screen.getByTestId('error-page')).toHaveTextContent('Error: No page found');
  });

  it('should render PageNotFound when page is null', async () => {
    resolvePageData.mockResolvedValueOnce(WrapSuccess(null));

    const ui = await ResearchPage({ params: mockParams });
    render(ui);

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
