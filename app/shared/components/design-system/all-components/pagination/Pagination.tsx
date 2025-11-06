'use client';

import { Pagination as MuiPagination, PaginationItem, type PaginationRenderItemParams } from '@mui/material';
import type { PaginationProps as MuiPaginationProps } from '@mui/material/Pagination';
import React from 'react';

import { PaginationItemType, paginationStyles } from './Pagination.style';

import { PageItemSchema } from '~/validators/pagination.schema';

type PaginationProps = {
  visiblePages: number;
  renderItem?: (item: PaginationRenderItemParams) => React.ReactNode;
} & Omit<MuiPaginationProps, 'renderItem'>;

const Pagination: React.FC<PaginationProps> = ({ visiblePages, renderItem, page, ...props }) => {
  const isSelectedPage = (item: PaginationRenderItemParams, currentPage: number, range: number): boolean => {
    const result = PageItemSchema.safeParse(item);
    if (!result.success) return false;

    const { page } = result.data;
    return page >= currentPage && page < currentPage + range;
  };

  return (
    <MuiPagination
      data-testid="Pagination"
      {...props}
      page={page}
      renderItem={(item) =>
        renderItem ? (
          renderItem(item)
        ) : (
          <PaginationItem
            {...item}
            selected={page != null && isSelectedPage(item, page, visiblePages)}
            sx={paginationStyles.item[item.type as PaginationItemType] ?? {}}
          />
        )
      }
    />
  );
};

export default Pagination;
