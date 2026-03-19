import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import React from 'react';

import FundSummaryHeader from './FundSummaryHeader';
import * as realContent from './FundSummaryHeader.content';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

import { getNavigationLink } from '~/lib/utils/navigationHelper';

jest.mock('~/lib/utils/navigationHelper', () => ({
  getNavigationLink: jest.fn()
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
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue('en');
  });

  it('should render correctly with REAL data and cover content functions', async () => {
    (getNavigationLink as jest.Mock).mockResolvedValue('/archive');

    const backlink = await realContent.getFundSummaryHeaderBacklinkUrl();
    expect(backlink).toBe('/archive');

    const props = {
      backLinkUrl: backlink,
      backLinkText: realContent.fundSummaryBacklinkText.en,
      title: realContent.fundSummaryTitle.en,
      data: realContent.fundSummaryContent
    };

    render(<FundSummaryHeader {...props} />);

    expect(screen.getByText(/Back to archive/i)).toBeInTheDocument();
    expect(screen.getByTestId('section-title')).toHaveTextContent(realContent.fundSummaryTitle.en);
    expect(screen.getByText(/Number of inventories/i)).toBeInTheDocument();
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
