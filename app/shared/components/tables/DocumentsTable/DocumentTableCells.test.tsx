import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  RenderActionCell,
  RenderCodeCell,
  RenderCodeHeader,
  RenderContentCell,
  RenderContentHeader,
  RenderDateCell,
  RenderDateHeader,
  RenderNameCell,
  RenderNameHeader,
  RenderSheetCell,
  RenderSheetHeader
} from './DocumentTableCells';
import { DocumentRecord } from '~/types/types/document.types';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());
const mockUseBreakpoints = useBreakpoints as jest.Mock;

jest.mock('~/shared/components/design-system/all-components/icon-button/IconButton', () => ({
  IconButton: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: ({ alt }: { alt: string }) => <div>{alt}</div>
}));

jest.mock('@mui/material', () => {
  const original = jest.requireActual('@mui/material');
  return {
    ...original,
    useMediaQuery: jest.fn()
  };
});
const mockUseMediaQuery = useMediaQuery as jest.Mock;

const mockRecord: DocumentRecord = {
  id: '1',
  cipher: 'F.1',
  name: 'Document 1',
  dates: '2020',
  sheets: 3,
  contentDescription: 'Some content',
  pdfUrl: null
};

describe('DocumentsTableCells', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Header renderers', () => {
    it('should render all headers', () => {
      render(
        <>
          <RenderCodeHeader />
          <RenderNameHeader />
          <RenderDateHeader />
          <RenderSheetHeader />
          <RenderContentHeader />
        </>
      );

      expect(screen.getByText('cipher')).toBeInTheDocument();
      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('date')).toBeInTheDocument();
      expect(screen.getByText('sheets')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });

  describe('Cell renderers', () => {
    it('should render cipher, name, dates, sheets, contentDescription cells', () => {
      const cipherCell = RenderCodeCell({ getValue: () => mockRecord.cipher } as CellContext<DocumentRecord, unknown>);
      const nameCell = RenderNameCell({ getValue: () => mockRecord.name } as CellContext<DocumentRecord, unknown>);
      const datesCell = RenderDateCell({ getValue: () => mockRecord.dates } as CellContext<DocumentRecord, unknown>);
      const sheetCell = RenderSheetCell({ getValue: () => mockRecord.sheets } as CellContext<DocumentRecord, unknown>);
      const contentCell = RenderContentCell({ getValue: () => mockRecord.contentDescription } as CellContext<
        DocumentRecord,
        unknown
      >);

      render(
        <>
          {cipherCell}
          {nameCell}
          {datesCell}
          {sheetCell}
          {contentCell}
        </>
      );

      expect(screen.getByText(mockRecord.cipher)).toBeInTheDocument();
      expect(screen.getByText(mockRecord.name)).toBeInTheDocument();
      expect(screen.getByText(mockRecord.dates)).toBeInTheDocument();
      expect(screen.getByText(mockRecord.contentDescription)).toBeInTheDocument();
    });
  });

  describe('RenderActionCell', () => {
    it('should render nothing if sheets is null', () => {
      mockUseBreakpoints.mockReturnValue({ isLaptop: false });
      mockUseMediaQuery.mockReturnValue(false);

      const record = { ...mockRecord, sheets: null };
      const cell = RenderActionCell({ row: { original: record } } as CellContext<DocumentRecord, unknown>);
      const { container } = render(<>{cell}</>);
      expect(container).toBeEmptyDOMElement();
    });

    it('should render correct button for large desktop', () => {
      mockUseBreakpoints.mockReturnValue({ isLaptop: false });
      mockUseMediaQuery.mockReturnValueOnce(false).mockReturnValueOnce(true);

      const cell = RenderActionCell({ row: { original: mockRecord } } as CellContext<DocumentRecord, unknown>);
      render(<>{cell}</>);
      expect(screen.getByText('view')).toBeInTheDocument();
    });

    it('should render correct button for small desktop', () => {
      mockUseBreakpoints.mockReturnValue({ isLaptop: false });
      mockUseMediaQuery.mockReturnValueOnce(true).mockReturnValueOnce(false);

      const cell = RenderActionCell({ row: { original: mockRecord } } as CellContext<DocumentRecord, unknown>);
      render(<>{cell}</>);
      expect(screen.getByText('shortView')).toBeInTheDocument();
    });

    it('should render icon button for laptop', () => {
      mockUseBreakpoints.mockReturnValue({ isLaptop: true });
      mockUseMediaQuery.mockReturnValue(false);

      const cell = RenderActionCell({ row: { original: mockRecord } } as CellContext<DocumentRecord, unknown>);
      render(<>{cell}</>);
      expect(screen.getByText('menu')).toBeInTheDocument();
    });
  });
});
