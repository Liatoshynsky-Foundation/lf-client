import { escapeRegex } from './escapeRegex';

export const searchHelper = (search?: string) => {
  if (!search) return '';
  const regex = { $regex: escapeRegex(search), $options: 'i' };
  return [{ 'title.uk': regex }, { 'title.en': regex }];
};

export const genreHelper = (genres?: string[] | undefined | null) => {
  const genreArray = Array.isArray(genres) ? genres.filter(Boolean) : [];
  return genreArray.length > 0 ? genreArray : null;
};

export const yearHelper = (years?: { min?: number; max?: number } | undefined | null) => {
  if (!years) return null;
  const q: any = {};
  if (years.min !== undefined) q.$gte = years.min;
  if (years.max !== undefined) q.$lte = years.max;
  return Object.keys(q).length > 0 ? { year: q } : null;
};
