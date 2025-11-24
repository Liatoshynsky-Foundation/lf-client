import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import React from 'react';

import { mockFundSummaryData } from './__fixtures__/fundSummaryHeader.fixtures';
import FundSummaryHeader, { FundSummaryHeaderProps } from './FundSummaryHeader';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

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
  useLocale: jest.fn(() => 'en')
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title }: any) => <div data-testid="section-title">{title}</div>
}));

jest.mock('~/components/tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: any) => {
    const renderer = nodeRenderers?.[TipTapNodeTypes.paragraph];
    const content = data?.content?.[0]?.content?.[0]?.text || 'mock content';
    return <div data-testid="tip-tap-content">{renderer ? renderer(content) : content}</div>;
  }
}));

jest.mock('~/ds-components/link/CustomLink', () => ({
  __esModule: true,
  default: ({ path, children, startIcon }: any) => (
    <a href={path} data-testid="custom-link">
      {startIcon}
      {children}
    </a>
  )
}));

describe('FundSummaryHeader', () => {
  const mockData: FundSummaryHeaderProps = {
    backLinkUrl: '/support-us',
    backLinkText: 'Back to Support Us',
    title: 'Fund Summary',
    data: mockFundSummaryData
  };

  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(backLink).toHaveAttribute('href', '/support-us');
    expect(backLink).toHaveTextContent('Back to Support Us');
  });

  it('should render the back link icon', () => {
    render(<FundSummaryHeader {...mockData} />);

    const icon = screen.getByAltText('');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/icons/arrow-left.svg');
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

  it('should render all items in Ukrainian locale', () => {
    jest.mocked(useLocale).mockReturnValue('uk');

    render(<FundSummaryHeader {...mockData} />);

    expect(screen.getByText('Назва фонду:')).toBeInTheDocument();
    expect(screen.getByText('Ціль фонду:')).toBeInTheDocument();
    expect(screen.getByText('Бенефіціари:')).toBeInTheDocument();
  });

  it('should split items into two columns correctly', () => {
    render(<FundSummaryHeader {...mockData} />);

    const itemTitles = screen.getAllByTestId('typography-h6');
    expect(itemTitles).toHaveLength(3);
  });

  it('should handle single item', () => {
    jest.mocked(useLocale).mockReturnValue('en');

    const singleItemData = {
      ...mockData,
      data: {
        items: [mockFundSummaryData.items[0]]
      }
    };

    render(<FundSummaryHeader {...singleItemData} />);

    expect(screen.getByText('Fund Name:')).toBeInTheDocument();
    expect(screen.getAllByTestId('tip-tap-content')).toHaveLength(1);
  });

  it('should handle empty items array', () => {
    const emptyData = {
      ...mockData,
      data: {
        items: []
      }
    };

    render(<FundSummaryHeader {...emptyData} />);

    expect(screen.getByTestId('section-title')).toBeInTheDocument();
    expect(screen.queryByTestId('typography-h6')).not.toBeInTheDocument();
  });

  it('should render TipTapContent with custom paragraph renderer', () => {
    render(<FundSummaryHeader {...mockData} />);

    const tipTapContents = screen.getAllByTestId('tip-tap-content');
    expect(tipTapContents.length).toBeGreaterThan(0);
  });

  it('should mount component without errors', () => {
    const { container } = render(<FundSummaryHeader {...mockData} />);

    expect(container).toBeInTheDocument();
  });
});
