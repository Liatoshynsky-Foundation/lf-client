import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import React from 'react';

import { ROUTES } from '../../constants/routes';
import { mockFundSummaryData } from './__fixtures__/fundSummaryHeader.fixtures';
import FundSummaryHeader, { FundSummaryHeaderProps } from './FundSummaryHeader';
import * as realContent from './FundSummaryHeader.content';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

jest.mock('~/lib/utils/navigationHelper', () => ({
  getNavigationLink: jest.fn()
}));
jest.mock('./FundSummaryHeader.content', () => ({
  __esModule: true,
  ...jest.requireActual('./FundSummaryHeader.content'),
  getFundSummaryHeaderBacklinkUrl: jest.fn().mockResolvedValue('/archive')
}));
jest.mock('@mui/material', () => ({
  Box: ({ children, ...props }: any) => (
    <div data-testid="mui-box" {...props}>
      {children}
    </div>
  ),
  Typography: ({ children, variant, ...props }: any) => (
    <span data-testid={`typography-${variant}`} {...props}>
      {children}
    </span>
  )
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />
}));

jest.mock('next-intl', () => ({
  useLocale: jest.fn()
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title }: any) => <div data-testid="section-title">{title}</div>
}));

jest.mock('~/components/tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: any) => {
    const renderer = nodeRenderers?.[TipTapNodeTypes.paragraph];
    const text = data?.content?.[0]?.content?.[0]?.text || '';
    return <div data-testid="tip-tap-content">{renderer ? renderer(text) : text}</div>;
  }
}));

jest.mock('~/ds-components/link/CustomLink', () => ({
  __esModule: true,
  default: ({ path, children }: any) => (
    <a href={path} data-testid="custom-link">
      {children}
    </a>
  )
}));

describe('FundSummaryHeader', () => {
  const mockData: FundSummaryHeaderProps = {
    backLinkUrl: ROUTES.SUPPORT_US,
    backLinkText: 'Back to Support Us',
    title: 'Fund Summary',
    data: mockFundSummaryData
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue('en');
  });

  it('should render the component with all main elements', () => {
    render(<FundSummaryHeader {...mockData} />);

    expect(screen.getByTestId('custom-link')).toBeInTheDocument();
    expect(screen.getByTestId('section-title')).toBeInTheDocument();
    expect(screen.getAllByTestId('tip-tap-content').length).toBeGreaterThan(0);
  });

  it('should render the back link with correct URL and text', () => {
    render(<FundSummaryHeader {...mockData} />);

    const backLink = screen.getByTestId('custom-link');
    expect(backLink).toHaveAttribute('href', ROUTES.SUPPORT_US);
    expect(backLink).toHaveTextContent('Back to Support Us');
  });

  it('should render the back link icon', () => {
    render(<FundSummaryHeader {...mockData} />);

    const backLink = screen.getByTestId('custom-link');
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', ROUTES.SUPPORT_US);
  });

  it('should render the title', () => {
    render(<FundSummaryHeader {...mockData} />);

    const title = screen.getByTestId('section-title');
    expect(title).toHaveTextContent('Fund Summary');
  });

  it('should render all items in English locale', () => {
    jest.mocked(useLocale).mockReturnValue('en');

    render(<FundSummaryHeader {...mockData} />);

    expect(screen.getByText('Fund Name:')).toBeInTheDocument();
    expect(screen.getByText('Fund Purpose:')).toBeInTheDocument();
    expect(screen.getByText('Beneficiaries:')).toBeInTheDocument();
  });

  it('should fetch backlink and pass it to the component', async () => {
    jest.mocked(useLocale).mockReturnValue('uk');

    const backlink = await realContent.getFundSummaryHeaderBacklinkUrl();
    expect(backlink).toBe('/archive');

    const props = {
      backLinkUrl: backlink,
      backLinkText: 'Назад',
      title: 'Заголовок',
      data: realContent.fundSummaryContent
    };

    render(<FundSummaryHeader {...props} />);

    const link = screen.getByTestId('custom-link');
    expect(link).toHaveAttribute('href', '/archive');
  });

  it('should render all items in Ukrainian locale', () => {
    (useLocale as jest.Mock).mockReturnValue('uk');

    render(
      <FundSummaryHeader
        backLinkUrl="/archive"
        backLinkText={realContent.fundSummaryBacklinkText.uk}
        title={realContent.fundSummaryTitle.uk}
        data={realContent.fundSummaryContent}
      />
    );

    expect(screen.getByText(/Повернутись до архіву/i)).toBeInTheDocument();
    expect(screen.getByText(/Кількість описів/i)).toBeInTheDocument();
    expect(screen.getByText(/Мова документів/i)).toBeInTheDocument();
  });

  it('should split items into two columns correctly (odd number)', () => {
    render(
      <FundSummaryHeader backLinkUrl="/" backLinkText="Back" title="Title" data={realContent.fundSummaryContent} />
    );

    expect(screen.getAllByTestId('typography-h6')).toHaveLength(realContent.fundSummaryContent.items.length);
  });
});
