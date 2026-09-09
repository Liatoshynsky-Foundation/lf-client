export interface ParsedFilters {
  categories: string[];
  author: string[];
  years: { min: number; max: number };
  search: string;
}

export function parseFilters(params: URLSearchParams): ParsedFilters {
  const currentYear = new Date().getFullYear();

  const categories = params.getAll('category');
  const author = params.getAll('author');

  const yearFrom = params.get('yearFrom');
  const yearTo = params.get('yearTo');

  const search = params.get('search') ?? '';

  const filters: ParsedFilters = {
    categories: [],
    author: [],
    years: { min: 1900, max: currentYear },
    search
  };

  if (categories.length) filters.categories = categories;
  if (author.length) filters.author = author;

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
