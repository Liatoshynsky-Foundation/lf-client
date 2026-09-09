import { render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';

import FundDetailsClient from './FundDetailsClient';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import type { DocumentRecord } from '~/types/types/document.types';

import { type FundDetailsDTO, FundStatus } from '~/domain/dto/funds.dto';
import { baseService } from '~/services/client/baseService';

const replace = jest.fn();
let headerProps: { title: string; backLinkUrl: string; backLinkText: string; data: unknown } | undefined;
let tableDocuments: DocumentRecord[] | undefined;

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace
  })
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <div data-testid="main-layout">{children}</div>
}));

jest.mock('~/components/blocks/fund-summary-header/FundSummaryHeader', () => ({
  __esModule: true,
  default: (props: { title: string; backLinkUrl: string; backLinkText: string; data: unknown }) => {
    headerProps = props;
    return <div data-testid="fund-summary-header">{props.title}</div>;
  }
}));

jest.mock('~/components/blocks/fund-summary-header/FundSummaryHeader.content', () => ({
  fundSummaryBacklinkText: {
    uk: 'Повернутись до архіву',
    en: 'Back to archive'
  }
}));

jest.mock('~/components/tables/DocumentsTable/DocumentTableSection', () => ({
  __esModule: true,
  default: ({ documents }: { documents: DocumentRecord[] }) => {
    tableDocuments = documents;
    return <div data-testid="document-table">{documents.length}</div>;
  }
}));

jest.mock('~/services/client/baseService', () => ({
  baseService: {
    request: jest.fn()
  }
}));

const fund: FundDetailsDTO = {
  id: 2,
  number: { uk: 'Фонд 2', en: 'Fund 2' },
  title: { uk: 'Особисті документи', en: 'Personal Documents' },
  numberOfDescriptions: 2,
  numberOfCases: 1,
  organizationForm: { uk: 'тематико-хронологічна', en: 'thematic-chronological' },
  documentCreationDate: '1895-1971',
  characterAndContent: {
    uk: { type: TipTapNodeTypes.doc, content: [] },
    en: { type: TipTapNodeTypes.doc, content: [] }
  },
  status: FundStatus.Published,
  cases: [
    {
      _id: 'case-1',
      cipher: 'Ф. 2, оп. 1, спр. 1',
      name: { uk: 'Документи', en: 'Documents' },
      dates: { uk: '1901', en: '1901' },
      sheets: 11,
      contentDescription: { uk: 'Опис', en: 'Description' },
      pdfUrl: '/case.pdf',
      order: 1,
      status: FundStatus.Published
    }
  ]
};

const requestMock = baseService.request as jest.Mock;

describe('FundDetailsClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    headerProps = undefined;
    tableDocuments = undefined;
  });

  it('should show a loader and render fetched fund details', async () => {
    requestMock.mockResolvedValue({ success: true, data: fund });

    render(
      <FundDetailsClient
        fundId={2}
        locale="uk"
        fundSummaryBacklinkUrl="/uk/archive"
        fundSummaryBacklinkText="Повернутись до архіву"
      />
    );

    expect(screen.getByTestId('FundDetailsPage-loader')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAccessibleName('loading');

    expect(await screen.findByTestId('fund-summary-header')).toHaveTextContent('Фонд 2. Особисті документи');
    expect(screen.getByTestId('document-table')).toHaveTextContent('1');

    expect(baseService.request).toHaveBeenCalledWith({
      method: 'GET',
      url: '/api/funds?id=2&lang=uk'
    });
    expect(headerProps).toMatchObject({
      title: 'Фонд 2. Особисті документи',
      backLinkUrl: '/uk/archive',
      backLinkText: 'Повернутись до архіву'
    });
    expect(tableDocuments).toEqual([
      {
        id: 'case-1',
        cipher: 'Ф. 2, оп. 1, спр. 1',
        name: 'Документи',
        dates: '1901',
        sheets: 11,
        contentDescription: 'Опис',
        pdfUrl: '/case.pdf'
      }
    ]);
    expect(replace).not.toHaveBeenCalled();
  });

  it('should redirect to the localized 404 page when the API returns an error', async () => {
    requestMock.mockRejectedValue(new Error('Failed to fetch fund details'));

    render(
      <FundDetailsClient
        fundId={404}
        locale="en"
        fundSummaryBacklinkUrl="/en/archive"
        fundSummaryBacklinkText="Back to archive"
      />
    );

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/en/404'));
    expect(screen.queryByTestId('fund-summary-header')).not.toBeInTheDocument();
  });

  it('should redirect to the localized 404 page when the response has no fund data', async () => {
    requestMock.mockResolvedValue({ success: true });

    render(
      <FundDetailsClient
        fundId={3}
        locale="uk"
        fundSummaryBacklinkUrl="/uk/archive"
        fundSummaryBacklinkText="Повернутись до архіву"
      />
    );

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/uk/404'));
  });
});
