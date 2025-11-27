import '@testing-library/jest-dom';
import { useMediaQuery } from '@mui/material';
import { CellContext } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { ArchiveRecord } from './documents.conts';
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

const mockRecord: ArchiveRecord = {
  id: '1',
  code: 'F.1',
  name: 'Document 1',
  date: '2020',
  sheets: 3,
  content: 'Some content',
  action: 'PDF'
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

      expect(screen.getByText('code')).toBeInTheDocument();
      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('date')).toBeInTheDocument();
      expect(screen.getByText('sheets')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });

  describe('Cell renderers', () => {
    it('should render code, name, date, sheets, content cells', () => {
      const codeCell = RenderCodeCell({ getValue: () => mockRecord.code } as CellContext<ArchiveRecord, unknown>);
      const nameCell = RenderNameCell({ getValue: () => mockRecord.name } as CellContext<ArchiveRecord, unknown>);
      const dateCell = RenderDateCell({ getValue: () => mockRecord.date } as CellContext<ArchiveRecord, unknown>);
      const sheetCell = RenderSheetCell({ getValue: () => mockRecord.sheets } as CellContext<ArchiveRecord, unknown>);
      const contentCell = RenderContentCell({ getValue: () => mockRecord.content } as CellContext<
        ArchiveRecord,
        unknown
      >);

      render(
        <>
          {codeCell}
          {nameCell}
          {dateCell}
          {sheetCell}
          {contentCell}
        </>
      );

      expect(screen.getByText(mockRecord.code)).toBeInTheDocument();
      expect(screen.getByText(mockRecord.name)).toBeInTheDocument();
      expect(screen.getByText(mockRecord.date)).toBeInTheDocument();
      expect(screen.getByText(mockRecord.content)).toBeInTheDocument();
    });
  });

  describe('RenderActionCell', () => {
    it('should render nothing if sheets is null', () => {
      mockUseBreakpoints.mockReturnValue({ isLaptop: false });
      mockUseMediaQuery.mockReturnValue(false);

      const record = { ...mockRecord, sheets: null };
      const cell = RenderActionCell({ row: { original: record } } as CellContext<ArchiveRecord, unknown>);
      const { container } = render(<>{cell}</>);
      expect(container).toBeEmptyDOMElement();
    });

    it('should render correct button for large desktop', () => {
      mockUseBreakpoints.mockReturnValue({ isLaptop: false });
      mockUseMediaQuery.mockReturnValueOnce(false).mockReturnValueOnce(true);

      const cell = RenderActionCell({ row: { original: mockRecord } } as CellContext<ArchiveRecord, unknown>);
      render(<>{cell}</>);
      expect(screen.getByText('view')).toBeInTheDocument();
    });

    it('should render correct button for small desktop', () => {
      mockUseBreakpoints.mockReturnValue({ isLaptop: false });
      mockUseMediaQuery.mockReturnValueOnce(true).mockReturnValueOnce(false);

      const cell = RenderActionCell({ row: { original: mockRecord } } as CellContext<ArchiveRecord, unknown>);
      render(<>{cell}</>);
      expect(screen.getByText('shortView')).toBeInTheDocument();
    });

    it('should render icon button for laptop', () => {
      mockUseBreakpoints.mockReturnValue({ isLaptop: true });
      mockUseMediaQuery.mockReturnValue(false);

      const cell = RenderActionCell({ row: { original: mockRecord } } as CellContext<ArchiveRecord, unknown>);
      render(<>{cell}</>);
      expect(screen.getByText('menu')).toBeInTheDocument();
    });
  });
});
