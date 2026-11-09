export interface ParsedFilters {
  categories: string[];
  years: { min: number; max: number };
  search: string;
}

export function parseFilters(params: URLSearchParams): ParsedFilters {
  const currentYear = new Date().getFullYear();

  const categories = params.getAll('category');

  const yearFrom = params.get('yearFrom');
  const yearTo = params.get('yearTo');

  const search = params.get('search') ?? '';

  const filters: ParsedFilters = {
    categories: [],
    years: { min: 1900, max: currentYear },
    search
  };

  if (categories.length) filters.categories = categories;

  if (yearFrom || yearTo) {
    const parsedFrom = yearFrom ? Number(yearFrom) : undefined;
    const parsedTo = yearTo ? Number(yearTo) : undefined;

    const min = parsedFrom ? Math.max(parsedFrom, 1900) : 1900;
    const max = parsedTo ? Math.min(parsedTo, currentYear) : currentYear;

    const finalMin = Math.min(min, max);
    const finalMax = Math.max(min, max);

    filters.years = { min: finalMin, max: finalMax };
  }

  return filters;
}
