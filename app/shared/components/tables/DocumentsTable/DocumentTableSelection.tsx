'use client';

import { ColumnDef } from '@tanstack/react-table';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

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
import { DocumentRecord } from '~/types/types/document.types';

import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import { Search } from '~/shared/components/search/Search';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export default function DocumentTableSelection({ documents }: { documents: DocumentRecord[] }) {
  const t = useTranslations('table.documents');
  const router = useRouter();
  const pathname = usePathname();

  const bp = useBreakpoints();
  const { isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove } = bp;

  const handleRowClick = (row: DocumentRecord) => {
    const caseId = row.id;
    if (!caseId) return;

    router.push(`${pathname.replace(/\/$/, '')}/${encodeURIComponent(caseId)}`);
  };

  const [search, setSearch] = useState('');
  const searchOptions = useMemo(() => [], []);

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

  const baseColumns: ColumnDef<DocumentRecord>[] = useMemo(
    () => [
      {
        id: 'cipher',
        accessorKey: 'cipher',
        header: RenderCodeHeader,
        cell: RenderCodeCell,
        sortingFn: 'alphanumeric'
      },
      { id: 'name', accessorKey: 'name', header: RenderNameHeader, cell: RenderNameCell, sortingFn: 'alphanumeric' },
      { id: 'dates', accessorKey: 'dates', header: RenderDateHeader, cell: RenderDateCell, sortingFn: 'alphanumeric' },
      {
        id: 'sheets',
        accessorKey: 'sheets',
        header: RenderSheetHeader,
        cell: RenderSheetCell,
        sortingFn: 'alphanumeric'
      },
      {
        id: 'contentDescription',
        accessorKey: 'contentDescription',
        header: RenderContentHeader,
        cell: RenderContentCell,
        sortingFn: 'alphanumeric'
      },
      { id: 'actions', header: '', cell: RenderActionCell }
    ],
    []
  );

  const searchNode = <Search search={search} setSearch={setSearch} options={searchOptions} />;

  if (isMobile || isTablet) {
    return <MobileDocumentTable tableName={t('name')} data={documents} Search={searchNode} />;
  }

  return (
    <EnhancedTable
      data={documents}
      columns={baseColumns}
      Search={searchNode}
      columnWidths={columnWidths}
      itemsPerPage={5}
      tableName={t('name')}
      onRowClick={handleRowClick}
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
