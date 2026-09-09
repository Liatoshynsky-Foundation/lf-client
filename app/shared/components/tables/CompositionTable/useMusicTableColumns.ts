import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import { getCompositionColumnWidths } from './getColumnWidth';
import {
  RenderActionsCell,
  RenderExpanderCell,
  RenderGenreCell,
  RenderGenreHeader,
  renderGroupActionsCell,
  renderNameCell,
  RenderNameHeader,
  renderOpusGenreGroupLabel,
  renderOpusGroupLabel,
  RenderOpusHeader,
  renderOpusTitleGroupLabel,
  renderOpusYearGroupLabel,
  RenderPlayCell,
  renderYearCell,
  RenderYearHeader
} from './MusicTableCells';
import { CompositionWithNotes, Music } from '~/types/types/enhancedTable';

interface UseMusicTableColumnsParams {
  breakpoints: {
    isMobile: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isDesktop: boolean;
    isLaptopAndAbove: boolean;
  };
  onOpenModal: (data: CompositionWithNotes) => void;
}

export function useMusicTableColumns({ breakpoints, onOpenModal }: UseMusicTableColumnsParams) {
  const { isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove } = breakpoints;

  const columnWidths = useMemo(
    () =>
      getCompositionColumnWidths({
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        isLaptopAndAbove
      }),
    [isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove]
  );

  const baseColumns: ColumnDef<Music>[] = useMemo(
    () => [
      { id: 'expander', header: '', cell: RenderExpanderCell },
      {
        id: 'opus',
        header: RenderOpusHeader,
        cell: () => null,
        meta: { groupLabelContentFactory: (items: Music[]) => renderOpusGroupLabel(items) }
      },
      { id: 'play', header: '', cell: RenderPlayCell },
      {
        id: 'name',
        accessorKey: 'compositionName',
        header: RenderNameHeader,
        cell: renderNameCell,
        enableSorting: false,
        meta: { groupLabelContentFactory: (items: Music[]) => renderOpusTitleGroupLabel(items) }
      },
      {
        id: 'year',
        accessorKey: 'compositionYear',
        header: RenderYearHeader,
        cell: renderYearCell,
        enableSorting: false,
        meta: { groupLabelContentFactory: (items: Music[]) => renderOpusYearGroupLabel(items) }
      },
      {
        id: 'genre',
        accessorKey: 'compositionGenre',
        header: RenderGenreHeader,
        cell: RenderGenreCell,
        enableSorting: false,
        meta: { groupLabelContentFactory: (items: Music[]) => renderOpusGenreGroupLabel(items) }
      },
      {
        id: 'actions',
        header: '',
        cell: (info) => RenderActionsCell(info, onOpenModal),
        meta: { groupLabelContentFactory: (items: Music[]) => renderGroupActionsCell(items) }
      }
    ],
    [onOpenModal]
  );

  const hiddenOnSmall = useMemo(() => new Set(['opus', 'year', 'genre', 'play']), []);

  const columns: ColumnDef<Music>[] = useMemo(
    () => (isTablet || isMobile ? baseColumns.filter((c) => !hiddenOnSmall.has(String(c.id))) : baseColumns),
    [isTablet, isMobile, baseColumns, hiddenOnSmall]
  );

  return { columns, columnWidths };
}
