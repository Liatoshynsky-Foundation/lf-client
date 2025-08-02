'use client';

import Box from '@mui/material/Box';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
  RenderActionCell,
  renderAuthorCell,
  RenderAuthorHeader,
  renderNameCell,
  RenderNameHeader,
  renderYearCell,
  RenderYearHeader
} from './WorkTableCells';
import { WorkTable } from '~/types/types/enhancedTable';

import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';

type Props = {
  data: WorkTable[];
};

export default function WorkTableSection({ data }: Readonly<Props>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const t = useTranslations('table.work');

  const columns: ColumnDef<WorkTable>[] = [
    {
      accessorKey: 'name',
      header: RenderNameHeader,
      cell: renderNameCell,
      sortingFn: 'alphanumeric'
    },
    {
      accessorKey: 'author',
      header: RenderAuthorHeader,
      cell: renderAuthorCell,
      sortingFn: 'alphanumeric'
    },
    {
      accessorKey: 'year',
      header: RenderYearHeader,
      cell: renderYearCell,
      sortingFn: 'basic'
    },
    {
      id: 'actions',
      header: '',
      cell: RenderActionCell
    }
  ];

  return (
    <Box
      sx={{
        '& .MuiTableRow-root': {
          '& td': {
            verticalAlign: 'top'
          }
        },
        gridColumn: '1/-1',
        width: '100%'
      }}
    >
      <EnhancedTable
        data={data}
        columns={columns}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        columnWidths={{
          name: '57%',
          author: '17%',
          year: '8%',
          actions: 'auto'
        }}
        itemsPerPage={10}
        tableName={t('name')}
      />
    </Box>
  );
}
