import { TableParams } from '~/shared/hooks/use-table-filters/useTableFilters';

export const tableParamsToQuery = <P extends TableParams>(params: P): string => {
  const parts: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) return;

    if (Array.isArray(value)) {
      if (!value.length) return;
      for (const v of value) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
      }
      return;
    }

    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  });

  if (!parts.length) return '';

  return `?${parts.join('&')}`;
};
