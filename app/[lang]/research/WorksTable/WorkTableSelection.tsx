'use client';

import Box from '@mui/material/Box';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

import { WorkTableFilters } from './filters/Filters';
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

import { AuthorDTO, ScientificWorkDTO } from '~/domain/dto/scientificWorks.dto';
import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';

export type AuthorFilterOption = {
  label: string;
  value: string;
};

type Props = {
  lang: string;
};

export default function WorkTableSection({ lang }: Readonly<Props>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [works, setWorks] = useState<WorkTable[]>([]);
  const [authorsList, setAuthorsList] = useState<AuthorFilterOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = useTranslations('table.work');
  useEffect(() => {
    const fetchAuthors = async () => {
      const authorsRes = await fetch('/api/scientific-authors');
      const authors: AuthorDTO[] = await authorsRes.json();
      const mappedAuthors: AuthorFilterOption[] = authors.map((author) => ({
        label: `${author.name || ''} ${author.surname || ''}`,
        value: author._id.toString()
      }));
      setAuthorsList(mappedAuthors);
    };
    fetchAuthors();
  }, [lang]);

  useEffect(() => {
    const fetchWorks = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        const currentAuthorFilter = (columnFilters.find((f) => f.id === 'author')?.value as string[]) || [];
        const currentYearFilter = (columnFilters.find((f) => f.id === 'year')?.value as [number, number]) || [];
        const currentTitleFilter = (columnFilters.find((f) => f.id === 'name')?.value as string) || '';

        if (currentAuthorFilter.length > 0) {
          params.append('authorIds', currentAuthorFilter.join(','));
        }

        if (currentYearFilter.length === 2) {
          params.append('years', currentYearFilter.join(','));
        }

        if (currentTitleFilter) {
          params.append('title', currentTitleFilter);
        }

        const worksRes = await fetch(`/api/scientific-works?lang=${lang}&${params.toString()}`);

        const worksJson: ScientificWorkDTO[] = await worksRes.json();
        const mappedWorks: WorkTable[] = worksJson.map((w) => {
          let yearDisplay: string | number = w.startYear;
          if (w.endYear) {
            yearDisplay = `${w.startYear}-${w.endYear}`;
          }

          return {
            id: w._id.toString(),
            name: w.title,
            author: w.authors.map((a) => `${a.name || ''} ${a.surname || ''}`).join(', '),
            year: yearDisplay,
            url: w.url,
            isPreview: w.isPreview
          };
        });
        setWorks(mappedWorks);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorks();
  }, [columnFilters, lang]);

  const minYear = 1900;
  const maxYear = new Date().getFullYear();

  const currentAuthorFilter = (columnFilters.find((f) => f.id === 'author')?.value as string[]) || [];
  const currentYearFilter = (columnFilters.find((f) => f.id === 'year')?.value as [number, number]) || [
    minYear,
    maxYear
  ];

  const isFiltersActive = columnFilters.length > 0;
  const activeFiltersCount = columnFilters.length;

  const handleAuthorFilterChange = useCallback((authors: string[]) => {
    setColumnFilters((prev) => {
      const without = prev.filter((f) => f.id !== 'author');
      return authors.length ? [...without, { id: 'author', value: authors }] : without;
    });
  }, []);

  const handleYearFilterChange = useCallback(
    (years: [number, number]) => {
      setColumnFilters((prev) => {
        const without = prev.filter((f) => f.id !== 'year');
        const isDefault = years[0] === minYear && years[1] === maxYear;
        return isDefault ? without : [...without, { id: 'year', value: years }];
      });
    },
    [minYear, maxYear]
  );

  const onClearAllFilters = useCallback(() => {
    setColumnFilters([]);
  }, []);

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
        data={works}
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
        Filters={
          <WorkTableFilters
            authors={authorsList}
            authorFilter={currentAuthorFilter}
            onAuthorFilterChange={handleAuthorFilterChange}
            yearFilter={currentYearFilter}
            onYearFilterChange={handleYearFilterChange}
            onClearAllFilters={onClearAllFilters}
          />
        }
        isFiltersActive={isFiltersActive}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={onClearAllFilters}
        loading={isLoading}
      />
    </Box>
  );
}
