import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import ArchiveCasePage from './page';

import type { ArchiveCaseDetailsProps } from '~/shared/components/blocks/archive-case-details/ArchiveCaseDetails';

const mockGetCaseById = jest.fn();

let archiveCaseDetailsProps: ArchiveCaseDetailsProps | undefined;
let archiveCaseDetailsCallCount = 0;

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('next/navigation', () => ({
  __esModule: true,
  notFound: jest.fn(() => {
    throw new Error('NOT_FOUND');
  })
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn(() => ({
    resolve: jest.fn(() => ({
      getCaseById: mockGetCaseById
    }))
  }))
}));

jest.mock('~/layouts/main-layout/MainLayout', () => {
  const MockMainLayout = ({ children }: { children: ReactNode }) => (
    <div data-testid="ArchiveCasePage-MainLayout">{children}</div>
  );
  MockMainLayout.displayName = 'MockMainLayout';
  return MockMainLayout;
});

jest.mock('~/shared/components/blocks/archive-case-details/ArchiveCaseDetails', () => ({
  __esModule: true,
  default: (props: ArchiveCaseDetailsProps) => {
    archiveCaseDetailsProps = props;
    archiveCaseDetailsCallCount += 1;

    return <div data-testid="ArchiveCaseDetailsMock">Archive case details</div>;
  }
}));

const mockCaseDetails = {
  name: 'Case name from backend',
  cipher: 'Ф. 2, оп. 1, спр. 3',
  dates: '1895–1955',
  sheets: 26,
  pdfUrl: 'https://example.com/f2-op1-spr3.pdf',
  documents: [
    { _id: 'doc-1', text: 'Документ А' },
    { _id: 'doc-2', text: 'Документ Б' }
  ],
  prevCase: {
    _id: 'prev-id',
    cipher: 'Ф. 2, оп. 1, спр. 2',
    name: 'Попередня справа'
  },
  nextCase: {
    _id: 'next-id',
    cipher: 'Ф. 2, оп. 1, спр. 4',
    name: 'Наступна справа'
  }
};

const mockedNotFound = notFound as unknown as jest.Mock;

describe('ArchiveCasePage', () => {
  beforeEach(() => {
    mockGetCaseById.mockReset();
    mockedNotFound.mockClear();
    archiveCaseDetailsProps = undefined;
    archiveCaseDetailsCallCount = 0;
  });

  it('renders archive case details inside main layout and maps data correctly', async () => {
    mockGetCaseById.mockResolvedValue(mockCaseDetails);

    const jsx = await ArchiveCasePage({
      params: Promise.resolve({ lang: 'en', fund: '2', case: 'op1-spr3' })
    });

    render(jsx);

    expect(screen.getByTestId('ArchiveCasePage-MainLayout')).toBeInTheDocument();
    expect(screen.getByTestId('ArchiveCaseDetailsMock')).toBeInTheDocument();

    expect(mockGetCaseById).toHaveBeenCalledWith('op1-spr3');
    expect(mockedNotFound).not.toHaveBeenCalled();
    expect(archiveCaseDetailsCallCount).toBe(1);
    expect(archiveCaseDetailsProps).toBeDefined();

    const props = archiveCaseDetailsProps as ArchiveCaseDetailsProps;

    expect(props.title).toBe(mockCaseDetails.name);
    expect(props.index).toBe(mockCaseDetails.cipher);
    expect(props.dateRange).toBe(mockCaseDetails.dates);
    expect(props.sheetsCount).toBe(mockCaseDetails.sheets);
    expect(props.pdfUrl).toBe(mockCaseDetails.pdfUrl);
    expect(props.fundHref).toBe('/en/archive/2');

    expect(props.documents).toEqual([
      { id: 'doc-1', title: 'Документ А' },
      { id: 'doc-2', title: 'Документ Б' }
    ]);

    expect(props.prevCase).toEqual({
      href: '/en/archive/2/prev-id',
      indexLabel: 'Ф. 2, оп. 1, спр. 2',
      title: 'Попередня справа'
    });

    expect(props.nextCase).toEqual({
      href: '/en/archive/2/next-id',
      indexLabel: 'Ф. 2, оп. 1, спр. 4',
      title: 'Наступна справа'
    });

    expect(props.labels).toEqual({
      back: 'back',
      metaCode: 'meta.code',
      metaDates: 'meta.dates',
      metaSheets: 'meta.sheets',
      documentsAria: 'documents.ariaLabel',
      viewPdf: 'buttons.viewPdf',
      prevCase: 'navigation.prev',
      nextCase: 'navigation.next'
    });
  });

  it('calls notFound when case is missing', async () => {
    mockGetCaseById.mockResolvedValue(null);

    await expect(
      ArchiveCasePage({
        params: Promise.resolve({ lang: 'en', fund: '2', case: 'missing-id' })
      })
    ).rejects.toThrow('NOT_FOUND');

    expect(mockedNotFound).toHaveBeenCalledTimes(1);
    expect(archiveCaseDetailsCallCount).toBe(0);
    expect(archiveCaseDetailsProps).toBeUndefined();
  });
});
