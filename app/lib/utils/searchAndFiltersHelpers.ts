import { escapeRegex } from './escapeRegex';

export const searchHelper = (search?: string) => {
  if (!search) return null;
  const cleanedExpression = escapeRegex(search);
  return cleanedExpression;
};

export const namedFilterHelper = (namedFilter?: string[]) => {
  const filterArray = Array.isArray(namedFilter) ? namedFilter.filter(Boolean) : [];
  return filterArray;
};

export const yearHelper = (years?: { min?: number; max?: number }) => {
  return { min: years?.min ?? 1900, max: years?.max ?? new Date().getFullYear() };
};
