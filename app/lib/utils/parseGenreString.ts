export function parseGenreString(genreStr?: string | null): string[] {
  if (!genreStr || typeof genreStr !== 'string') return [];

  return genreStr
    .split(',')
    .map((g) => g.trim())
    .filter((g) => g.length > 0);
}
