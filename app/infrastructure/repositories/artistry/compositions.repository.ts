import type { FilterQuery, PipelineStage, Types } from 'mongoose';

import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import { CompositionItemDTO } from '~/domain/dto/composition.dto';
import dbConnect from '~/infrastructure/db/connect';
import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { parseGenreString } from '~/lib/utils/parseGenreString';
import { namedFilterHelper, searchHelper, yearHelper } from '~/lib/utils/searchAndFiltersHelpers';
import { compositionTitlesSchema, opusGroupSchema } from '~/validators/artistry/composition.schema';
import { namedFilterSchema } from '~/validators/artistry/namedFilter.schema';
import { ArraySchema } from '~/validators/constants';
const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

type TranslatedFieldLean = { uk: string; en: string };

type OptionalTranslatedFieldLean = { uk?: string; en?: string };

type OpusPerformanceLean = {
  _id: Types.ObjectId | string;
  title?: OptionalTranslatedFieldLean;
  videoUrl: string;
};

type OpusLean = {
  _id: Types.ObjectId | string;
  number: number | string;
  numberKind?: string;
  title: TranslatedFieldLean;
  releaseYear?: number;
  creationYear?: string;
  endYear?: string;
  genre?: OptionalTranslatedFieldLean | null;
  introDescription?: OptionalTranslatedFieldLean | null;
  description?: OptionalTranslatedFieldLean | null;
  parts?: OptionalTranslatedFieldLean;
  sheetMusicUrl?: string | null;
  performances?: OpusPerformanceLean[];
  compositions?: (Types.ObjectId | string)[];
  status?: string;
};

type SheetMusicLean = {
  url: string;
  isFree: boolean;
};

type OpusCompositionLean = {
  _id: Types.ObjectId | string;
  name: TranslatedFieldLean;
  year?: number;
  genre?: string;
  sheetMusic?: SheetMusicLean[];
};

export type OpusWithCompositionsLean = {
  opus: OpusLean;
  compositions: OpusCompositionLean[];
};

const COMPOSITION_YEAR_FLOOR = 1900;

function toNumericYearField(field: string) {
  return { $convert: { input: field, to: 'double', onError: null, onNull: null } };
}

function combineYearRanges(
  ranges: Array<{ minYear?: number | null; maxYear?: number | null } | null>,
  fallbackMax: number
) {
  const mins = ranges
    .map((range) => (range?.minYear != null ? Number(range.minYear) : null))
    .filter((year): year is number => Number.isFinite(year));

  const maxs = ranges
    .map((range) => (range?.maxYear != null ? Number(range.maxYear) : null))
    .filter((year): year is number => Number.isFinite(year));

  return {
    minYear: mins.length > 0 ? Math.min(...mins) : COMPOSITION_YEAR_FLOOR,
    maxYear: maxs.length > 0 ? Math.max(...maxs) : fallbackMax
  };
}

function getBaseAggregatePipeline(): PipelineStage[] {
  return [
    {
      $match: {
        status: { $ne: 'draft' },
        creationYear: { $nin: [null, ''] },
        $or: [{ 'name.uk': { $nin: [null, ''] } }, { 'name.en': { $nin: [null, ''] } }]
      }
    },
    {
      $lookup: {
        from: 'compositions',
        localField: 'compositions',
        foreignField: '_id',
        as: 'compositions'
      }
    }
  ];
}

function getOpusCondition(selectedSpecialKeys: string[]): FilterQuery<unknown> | null {
  if (selectedSpecialKeys.length === 0) return null;
  const isWithOpus = selectedSpecialKeys.includes('with-opus');
  const isWithoutOpus = selectedSpecialKeys.includes('without-opus');
  if (isWithOpus && isWithoutOpus) return null;
  return { numberKind: isWithOpus ? 'op' : 'sineop' };
}

function getYearCondition(years: { min?: number; max?: number } | undefined): FilterQuery<unknown> | null {
  const readyYearObject = yearHelper(years);
  if (!readyYearObject) return null;

  const minStr = String(readyYearObject.min);
  const maxStr = String(readyYearObject.max);

  return {
    $or: [
      { creationYear: { $gte: minStr, $lte: maxStr } },
      { endYear: { $gte: minStr, $lte: maxStr } },
      { 'compositions.year': { $gte: readyYearObject.min, $lte: readyYearObject.max } }
    ]
  };
}

function getSearchCondition(search: string | undefined, includeGenreInSearch: boolean): FilterQuery<unknown> | null {
  const searchPattern = searchHelper(search);
  if (!searchPattern) return null;

  const searchOr: FilterQuery<unknown>[] = [
    { 'title.uk': { $regex: searchPattern, $options: 'i' } },
    { 'title.en': { $regex: searchPattern, $options: 'i' } },
    { 'name.uk': { $regex: searchPattern, $options: 'i' } },
    { 'name.en': { $regex: searchPattern, $options: 'i' } },
    { 'compositions.name.uk': { $regex: searchPattern, $options: 'i' } },
    { 'compositions.name.en': { $regex: searchPattern, $options: 'i' } },
    ...(includeGenreInSearch
      ? [
          { 'genre.uk': { $regex: searchPattern, $options: 'i' } },
          { 'genre.en': { $regex: searchPattern, $options: 'i' } },
          { 'compositions.genre': { $regex: searchPattern, $options: 'i' } },
          { 'compositions.genre.uk': { $regex: searchPattern, $options: 'i' } },
          { 'compositions.genre.en': { $regex: searchPattern, $options: 'i' } }
        ]
      : [])
  ];

  return { $or: searchOr };
}

async function buildCommonAndConditions(
  search: string | undefined,
  categoryKeys: string[] | undefined,
  years: { min?: number; max?: number } | undefined,
  includeGenreInSearch: boolean
): Promise<{ conditions: FilterQuery<unknown>[]; noCategoryMatches: boolean }> {
  const allCategoryKeys = categoryKeys || [];
  const specialKeys = new Set<string>(['with-opus', 'without-opus']);
  const regularCategoryKeys = allCategoryKeys.filter((key) => !specialKeys.has(key));
  const selectedSpecialKeys = allCategoryKeys.filter((key) => specialKeys.has(key));

  let categoryCondition: FilterQuery<unknown> | null = null;
  if (regularCategoryKeys.length > 0) {
    const categoryIds = await Category.find({ key: { $in: regularCategoryKeys } })
      .select('_id')
      .lean();
    if (categoryIds.length === 0) {
      return { conditions: [], noCategoryMatches: true };
    }
    categoryCondition = { 'compositions.categories': { $in: categoryIds.map((c) => c._id) } };
  }

  const conditions = [
    getOpusCondition(selectedSpecialKeys),
    categoryCondition,
    getYearCondition(years),
    getSearchCondition(search, includeGenreInSearch)
  ].filter((c): c is FilterQuery<unknown> => c !== null);

  return { conditions, noCategoryMatches: false };
}

const compositionsRepository = {
  async getAllGenres() {
    await dbConnect();
    const ukGenres = await Opus.distinct('genre.uk');
    const enGenres = await Opus.distinct('genre.en');
    const rawGenres = [...ukGenres, ...enGenres];
    const parsedGenres = (rawGenres as (string | null)[]).flatMap(parseGenreString);
    const uniqueGenres = Array.from(new Set(parsedGenres));
    return uniqueGenres.sort((a, b) => a.localeCompare(b));
  },

  async getAllCategories() {
    await dbConnect();
    const categories = await Category.find().lean();
    return ArraySchema(namedFilterSchema).parse(categories);
  },

  async getCompositionsYearRange() {
    await dbConnect();
    const now = new Date().getFullYear();

    const [opusAgg, compositionsAgg] = await Promise.all([
      Opus.aggregate([
        { $match: { status: { $ne: 'draft' } } },
        {
          $project: {
            allYears: [toNumericYearField('$creationYear'), toNumericYearField('$endYear')]
          }
        },
        { $unwind: '$allYears' },
        { $match: { allYears: { $gte: COMPOSITION_YEAR_FLOOR, $lte: now } } },
        {
          $group: {
            _id: null,
            minYear: { $min: '$allYears' },
            maxYear: { $max: '$allYears' }
          }
        }
      ]),
      Compositions.aggregate([
        { $match: { year: { $gte: COMPOSITION_YEAR_FLOOR, $lte: now } } },
        {
          $group: {
            _id: null,
            minYear: { $min: '$year' },
            maxYear: { $max: '$year' }
          }
        }
      ])
    ]);

    const opusRow = Array.isArray(opusAgg) && opusAgg.length > 0 ? opusAgg[0] : null;
    const compositionsRow = Array.isArray(compositionsAgg) && compositionsAgg.length > 0 ? compositionsAgg[0] : null;

    return combineYearRanges([opusRow, compositionsRow], now);
  },

  async getArtistrySearchSuggestions(filters: CompositionsTitleFilters = {}) {
    await dbConnect();

    const { search, category, yearFrom, yearTo } = filters;
    const searchPattern = searchHelper(search);
    const { conditions, noCategoryMatches } = await buildCommonAndConditions(
      search,
      namedFilterHelper(category),
      { min: yearFrom ?? undefined, max: yearTo ?? undefined },
      false
    );

    if (noCategoryMatches) return [];

    const aggregatePipeline = [
      ...getBaseAggregatePipeline(),
      ...(conditions.length > 0 ? [{ $match: { $and: conditions } }] : []),
      {
        $project: {
          _id: 1,
          title: 1,
          name: 1,
          number: 1,
          numberKind: 1,
          additionalText: 1,
          compositions: {
            $filter: {
              input: '$compositions',
              as: 'comp',
              cond: searchPattern
                ? {
                    $or: [
                      { $regexMatch: { input: '$$comp.name.uk', regex: searchPattern, options: 'i' } },
                      { $regexMatch: { input: '$$comp.name.en', regex: searchPattern, options: 'i' } }
                    ]
                  }
                : { $literal: true }
            }
          },
          opusMatchesSearch: searchPattern
            ? {
                $or: [
                  { $regexMatch: { input: '$title.uk', regex: searchPattern, options: 'i' } },
                  { $regexMatch: { input: '$title.en', regex: searchPattern, options: 'i' } },
                  { $regexMatch: { input: '$name.uk', regex: searchPattern, options: 'i' } },
                  { $regexMatch: { input: '$name.en', regex: searchPattern, options: 'i' } }
                ]
              }
            : { $literal: true }
        }
      }
    ];

    const results = await Opus.aggregate(aggregatePipeline).exec();

    const flatResults: Record<string, unknown>[] = results.flatMap((opus) => [
      ...(opus.opusMatchesSearch
        ? [
            {
              _id: opus._id.toString(),
              title: opus.title,
              type: 'opus'
            }
          ]
        : []),
      ...(opus.compositions || []).map((comp: CompositionItemDTO) => ({
        _id: comp._id.toString(),
        title: comp.name,
        type: 'composition',
        opusContext: {
          _id: opus._id.toString(),
          number: opus.number,
          numberKind: opus.numberKind,
          additionalText: opus.additionalText
        }
      }))
    ]);

    return ArraySchema(compositionTitlesSchema).parse(flatResults);
  },

  async getOpusById(id: string): Promise<OpusWithCompositionsLean | null> {
    await dbConnect();

    if (!OBJECT_ID_REGEX.test(id)) {
      return null;
    }

    const opus = await Opus.findById(id).lean<OpusLean | null>();

    if (!opus || opus.status === 'draft') {
      return null;
    }

    const compositionIds = opus.compositions ?? [];

    const compositions = compositionIds.length
      ? await Compositions.find({ _id: { $in: compositionIds } }).lean<OpusCompositionLean[]>()
      : [];

    const orderById = new Map(compositionIds.map((compositionId, index) => [String(compositionId), index]));
    compositions.sort((a, b) => (orderById.get(String(a._id)) ?? 0) - (orderById.get(String(b._id)) ?? 0));

    return { opus, compositions };
  },

  async getAllCompositions(
    search?: string,
    filters?: { categories?: string[]; years?: { min?: number; max?: number } }
  ) {
    await dbConnect();

    const { conditions, noCategoryMatches } = await buildCommonAndConditions(
      search,
      namedFilterHelper(filters?.categories),
      filters?.years,
      true
    );

    if (noCategoryMatches) return [];

    const aggregatePipeline = [
      ...getBaseAggregatePipeline(),
      {
        $unwind: {
          path: '$compositions',
          preserveNullAndEmptyArrays: false
        }
      },
      ...(conditions.length > 0 ? [{ $match: { $and: conditions } }] : []),
      {
        $group: {
          _id: '$_id',
          number: { $first: '$number' },
          title: { $first: '$title' },
          numberKind: { $first: '$numberKind' },
          name: { $first: '$name' },
          additionalText: { $first: '$additionalText' },
          creationYear: { $first: '$creationYear' },
          endYear: { $first: '$endYear' },
          status: { $first: '$status' },
          genre: { $first: '$genre' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          compositions: { $push: '$compositions' }
        }
      },
      {
        $sort: { numberKind: 1 as const, number: 1 as const, additionalText: 1 as const }
      }
    ];

    const opuses = await Opus.aggregate(aggregatePipeline).exec();

    if (!opuses || opuses.length === 0) return [];

    return ArraySchema(opusGroupSchema).parse(opuses);
  }
};

function newCompositionsRepo(): typeof compositionsRepository {
  return compositionsRepository;
}

export default newCompositionsRepo;
