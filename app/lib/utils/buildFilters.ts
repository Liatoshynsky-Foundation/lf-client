import { escapeRegex } from './escapeRegex';

import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';

export const buildSearchCondition = (search?: string) => {
  if (!search) return null;

  const regex = { $regex: escapeRegex(search), $options: 'i' };
  return { $or: [{ 'title.uk': regex }, { 'title.en': regex }] };
};

export const buildGenresCondition = async (
  genres?: string | string[] | null,
  genreCollection: { find: (q: any) => any } = Genre
) => {
  if (Array.isArray(genres) && genres && genres.length !== 0) {
    const found = await genreCollection.find({ key: { $in: genres } }).select('_id');
    return { genres: { $in: found.map((g: any) => g._id) } };
  } else {
    return [];
  }
};

export const buildYearsCondition = (filters?: any) => {
  if (!filters?.years) return null;

  const yearQuery: any = {};
  if (filters.years.min !== undefined) yearQuery.$gte = filters.years.min;
  if (filters.years.max !== undefined) yearQuery.$lte = filters.years.max;

  return Object.keys(yearQuery).length > 0 ? { year: yearQuery } : null;
};
