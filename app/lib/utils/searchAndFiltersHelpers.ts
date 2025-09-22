import { escapeRegex } from './escapeRegex';

export const searchHelper = (search?: string) => {
  if (!search) return null;
  const cleanedExpression = escapeRegex(search);
  return cleanedExpression;
};

export const genreHelper = (genres?: string[]) => {
  const genreArray = Array.isArray(genres) ? genres.filter(Boolean) : [];
  return genreArray;
};

export const yearHelper = (years?: { min?: number; max?: number }) => {
  return { min: years?.min ?? 1990, max: years?.max ?? new Date().getFullYear() };
};
