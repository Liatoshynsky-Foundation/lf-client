export function parseFilters(params: URLSearchParams) {
  const currentYear = new Date().getFullYear();

  const genres = params.getAll('genre');
  const categories = params.getAll('category');
  const author = params.getAll('author');

  const yearFrom = params.get('yearFrom');
  const yearTo = params.get('yearTo');

  const search = params.get('search') ?? '';

  const filters = {
    categories: [] as string[],
    genres: [] as string[],
    author: [] as string[],
    years: { min: 1900, max: currentYear },
    search
  };

  if (genres.length) filters.genres = genres;
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
