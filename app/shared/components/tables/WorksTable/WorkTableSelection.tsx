'use client';

import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { WorkTableFilters } from './filters/Filters';
import { getWorkTableColumnWidths } from './getColumnWidth';
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
import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export type AuthorFilterOption = {
  label: string;
  value: string;
};

type Props = {
  lang: string;
};

const getAuthorsList = async (): Promise<AuthorFilterOption[]> => {
  const authorsRes = await fetch('/api/scientific-authors');
  const authors: AuthorDTO[] = await authorsRes.json();
  return authors.map((author) => ({
    label: `${author.name || ''} ${author.surname || ''}`,
    value: author._id.toString()
  }));
};

const getWorks = async (lang: string, columnFilters: ColumnFiltersState): Promise<WorkTable[]> => {
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

  return worksJson.map(mapScientificWorkToWorkTable);
};

const mapScientificWorkToWorkTable = (w: ScientificWorkDTO): WorkTable => {
  let yearDisplay: string | number = w.startYear;
  if (w.endYear) {
    yearDisplay = `${w.startYear}-${w.endYear}`;
  }

  const authorsJoined = w.authors.map((a) => `${a.name || ''} ${a.surname || ''}`).join(', ');

  return {
    id: w._id.toString(),
    name: w.title,
    author: authorsJoined,
    year: yearDisplay,
    sortableYear: w.startYear,
    url: w.url,
    isPreview: w.isPreview
  };
};

export const WorkTableSection = ({ lang }: Readonly<Props>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [works, setWorks] = useState<WorkTable[]>([]);
  const [authorsList, setAuthorsList] = useState<AuthorFilterOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const bp = useBreakpoints();

  const t = useTranslations('table.work');

  useEffect(() => {
    getAuthorsList().then(setAuthorsList);
  }, [lang]);

  useEffect(() => {
    setIsLoading(true);
    getWorks(lang, columnFilters)
      .then(setWorks)
      .finally(() => setIsLoading(false));
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

  const { isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove } = bp;

  const columnWidths = useMemo(
    () =>
      getWorkTableColumnWidths({
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        isLaptopAndAbove
      }),
    [isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove]
  );

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

  const baseColumns: ColumnDef<WorkTable>[] = useMemo(
    () => [
      {
        id: 'name',
        accessorKey: 'name',
        header: RenderNameHeader,
        cell: renderNameCell,
        sortingFn: 'alphanumeric'
      },
      {
        id: 'author',
        accessorKey: 'author',
        header: RenderAuthorHeader,
        cell: renderAuthorCell,
        sortingFn: 'alphanumeric'
      },
      {
        id: 'sortableYear',
        accessorKey: 'sortableYear',
        header: RenderYearHeader,
        cell: (info) => renderYearCell(info.row.original.year),
        sortingFn: 'basic'
      },
      {
        id: 'actions',
        header: '',
        cell: RenderActionCell
      }
    ],
    []
  );

  const columns: ColumnDef<WorkTable>[] = useMemo(() => {
    if (bp.isTablet || bp.isMobile) {
      const hidden = new Set(['author', 'sortableYear']);
      return baseColumns.filter((c) => !hidden.has(String(c.id)));
    }
    return baseColumns;
  }, [bp.isTablet, bp.isMobile, baseColumns]);

  const tableKey = (bp.isMobile && 'mobile') || (bp.isTablet && 'tablet') || 'desktop';

  return (
    <EnhancedTable
      key={tableKey}
      data={works}
      columns={columns}
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      columnWidths={columnWidths}
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
  );
};
