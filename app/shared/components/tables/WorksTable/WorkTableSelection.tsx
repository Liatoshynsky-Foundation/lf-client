'use client';

import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { YearNumericFilter } from './filters/YearNumericFilter';
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

import { FilterSelect } from '~/shared/components/design-system/all-components/selector/FilterSelect';
import { TableFilters } from '~/shared/components/design-system/all-components/table-filters/TableFilters';
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
  const authors = await authorsRes.json();

  return authors.map((a: { key: string; name: string }) => ({
    value: a.key,
    label: a.name
  }));
};

// NEW — fetch from new data endpoint
const getWorks = async (lang: string, columnFilters: ColumnFiltersState): Promise<WorkTable[]> => {
  const params = new URLSearchParams();

  const currentAuthorFilter = (columnFilters.find((f) => f.id === 'author')?.value as string[]) || [];
  const currentYearFilter = (columnFilters.find((f) => f.id === 'year')?.value as [number, number]) || [];

  if (currentAuthorFilter.length > 0) {
    params.append('authorIds', currentAuthorFilter.join(','));
  }

  if (currentYearFilter.length === 2) {
    params.append('years', currentYearFilter.join(','));
  }

  const worksRes = await fetch(`/api/scientific-works/data?lang=${lang}&${params.toString()}`);
  const worksJson = await worksRes.json();

  return worksJson.map(mapScientificWorkToWorkTable);
};

// NEW — mapping matches new API shape
const mapScientificWorkToWorkTable = (w: any): WorkTable => {
  const yearDisplay = w.endYear ? `${w.startYear}-${w.endYear}` : w.startYear;

  return {
    id: w.id || w._id,
    name: w.title,
    author: Array.isArray(w.authors) ? w.authors.join(', ') : w.authors,
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
  const tFilters = useTranslations('table.work.filters');

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

  const currentAuthorFilter = useMemo(
    () => (columnFilters.find((f) => f.id === 'author')?.value as string[]) || [],
    [columnFilters]
  );
  const currentYearFilter = useMemo(
    () => (columnFilters.find((f) => f.id === 'year')?.value as [number, number]) || [minYear, maxYear],
    [columnFilters, minYear, maxYear]
  );

  const isYearActive = currentYearFilter[0] !== minYear || currentYearFilter[1] !== maxYear;

  const activeFiltersCount = currentAuthorFilter.length + (isYearActive ? 1 : 0);
  const isFiltersActive = activeFiltersCount > 0;

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

  const filters = useMemo(
    () => [
      {
        id: 'author',
        isActive: currentAuthorFilter.length > 0,
        element: (
          <FilterSelect
            label={tFilters('author')}
            options={authorsList.map((a) => ({ value: a.value, label: a.label }))}
            defaultValues={currentAuthorFilter}
            variant="filled"
            maxSelections={10}
            onAdd={(v, l, all) => handleAuthorFilterChange(all)}
            onRemove={(v, l, all) => handleAuthorFilterChange(all)}
          />
        )
      },
      {
        id: 'year',
        isActive: isYearActive,
        isStatic: true,
        element: (
          <YearNumericFilter
            label={tFilters('yearLabel')}
            value={currentYearFilter}
            onChange={handleYearFilterChange}
            onChangeCommitted={handleYearFilterChange}
            minYear={minYear}
            maxYear={maxYear}
          />
        )
      }
    ],
    [
      currentAuthorFilter,
      tFilters,
      authorsList,
      isYearActive,
      currentYearFilter,
      handleYearFilterChange,
      maxYear,
      handleAuthorFilterChange
    ]
  );

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
        <TableFilters isAnyFilterActive={isFiltersActive} onClearAllFilters={onClearAllFilters} filters={filters} />
      }
      isFiltersActive={isFiltersActive}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={onClearAllFilters}
      loading={isLoading}
    />
  );
};
