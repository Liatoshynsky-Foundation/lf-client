'use client';

import { Pagination as MuiPagination, PaginationItem, type PaginationRenderItemParams } from '@mui/material';
import type { PaginationProps as MuiPaginationProps } from '@mui/material/Pagination';
import React from 'react';

import { PaginationItemType, paginationStyles } from './Pagination.style';

import { PageItemSchema } from '~/validators/pagination.schema';

type PaginationProps = {
  visiblePages: number;
  hasMore?: boolean;
  renderItem?: (item: PaginationRenderItemParams) => React.ReactNode;
} & Omit<MuiPaginationProps, 'renderItem'>;

const Pagination: React.FC<PaginationProps> = ({ visiblePages, renderItem, hasMore, page, ...props }) => {
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
      renderItem={(item) => {
        let disabled = item.disabled;
        if (item.type === 'next' && !hasMore) disabled = true;

        return renderItem ? (
          renderItem(item)
        ) : (
          <PaginationItem
            data-testid={`Pagination-${item.type}-${item.page}`}
            {...item}
            disabled={disabled}
            selected={page != null && isSelectedPage(item, page, visiblePages)}
            sx={paginationStyles.item[item.type as PaginationItemType] ?? {}}
          />
        );
      }}
    />
  );
};

export default Pagination;
