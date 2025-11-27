'use client';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { ArchiveRecord, archiveRecords } from './documents.conts';
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
import { getDocumentsTableColumnWidths } from './getColumnWidth';
import MobileDocumentTable from './MobileDocumentTable/MobileDocumentTable';

import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export default function DocumentTableSelection() {
  const [docs] = useState<ArchiveRecord[]>(archiveRecords);
  const t = useTranslations('table.documents');
  const bp = useBreakpoints();
  const { isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove } = bp;

  const columnWidths = useMemo(
    () =>
      getDocumentsTableColumnWidths({
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        isLaptopAndAbove
      }),
    [isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove]
  );

  const baseColumns: ColumnDef<ArchiveRecord>[] = useMemo(
    () => [
      {
        id: 'code',
        accessorKey: 'code',
        header: RenderCodeHeader,
        cell: RenderCodeCell,
        sortingFn: 'alphanumeric'
      },
      {
        id: 'name',
        accessorKey: 'name',
        header: RenderNameHeader,
        cell: RenderNameCell,
        sortingFn: 'alphanumeric'
      },
      {
        id: 'date',
        accessorKey: 'date',
        header: RenderDateHeader,
        cell: RenderDateCell,
        sortingFn: 'alphanumeric'
      },
      {
        id: 'sheets',
        accessorKey: 'sheets',
        header: RenderSheetHeader,
        cell: RenderSheetCell,
        sortingFn: 'alphanumeric'
      },
      {
        id: 'content',
        accessorKey: 'content',
        header: RenderContentHeader,
        cell: RenderContentCell,
        sortingFn: 'alphanumeric'
      },
      {
        id: 'actions',
        header: '',
        cell: RenderActionCell
      }
    ],
    []
  );

  if (isMobile || isTablet) {
    return <MobileDocumentTable tableName={t('name')} data={docs} />;
  }

  return (
    <EnhancedTable
      data={docs}
      columns={baseColumns}
      columnWidths={columnWidths}
      itemsPerPage={5}
      tableName={t('name')}
      rowSx={{
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        '&:hover': {
          backgroundColor: 'rgba(217, 220, 232, 0.3)',
          '& .name-cell': {
            textDecoration: 'underline'
          }
        }
      }}
    />
  );
}
