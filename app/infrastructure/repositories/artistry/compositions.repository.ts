import type { FilterQuery, PipelineStage, Types } from 'mongoose';

import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import { CompositionDTO, Condition, OpusDTO, Query } from '~/domain/dto/composition.dto';
import dbConnect from '~/infrastructure/db/connect';
import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Genre } from '~/infrastructure/models/artistry/artistryGenreData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { parseFullOpus as parseOpus } from '~/lib/utils/opusParser';
import { namedFilterHelper, searchHelper, yearHelper } from '~/lib/utils/searchAndFiltersHelpers';
import { compositionSchema, compositionTitlesSchema } from '~/validators/artistry/composition.schema';
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
  description?: OptionalTranslatedFieldLean | null;
  parts?: OptionalTranslatedFieldLean;
  sheetMusicUrl?: string | null;
  performances?: OpusPerformanceLean[];
  compositions?: (Types.ObjectId | string)[];
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

function buildWordSearchConditions<T>(words: string[], fields: string[]): FilterQuery<T>[] {
  return words.map((word) => ({
    $or: fields.map((field) => ({
      [field]: { $regex: word, $options: 'i' }
    }))
  })) as FilterQuery<T>[];
}

function buildAllWordsPresent<T>(words: string[], fieldGroups: string[][]): FilterQuery<T> {
  const andClauses = fieldGroups.map((group) => buildWordSearchConditions<T>(words, group));

  return {
    $or: andClauses.map((clauses) => ({ $and: clauses }))
  };
}

const compositionsRepository = {
  async getAllGenres() {
    await dbConnect();
    const genres = await Genre.find().lean();
    return ArraySchema(namedFilterSchema).parse(genres);
  },

  async getAllCategories() {
    await dbConnect();
    const categories = await Category.find().lean();
    return ArraySchema(namedFilterSchema).parse(categories);
  },

  async getCompositionsYearRange() {
    await dbConnect();
    const agg = await Compositions.aggregate([
      { $match: { year: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: null,
          minYear: { $min: '$year' },
          maxYear: { $max: '$year' }
        }
      }
    ]);
    const row = Array.isArray(agg) && agg.length > 0 ? agg[0] : null;
    const now = new Date().getFullYear();
    return {
      minYear: row?.minYear ?? 1900,
      maxYear: row?.maxYear ?? now
    };
  },

  async getAllCompositionTitles(filters: CompositionsTitleFilters = {}) {
    await dbConnect();

    const { search, category, genre, yearFrom, yearTo } = filters;

    let searchWords: string[] = [];

    if (search?.trim()) {
      searchWords = search
        .trim()
        .split(/\s+/)
        .map((w) => w.trim())
        .filter((w): w is string => w.length >= 2)
        .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    }

    const hasSearch = searchWords.length > 0;

    const compositionPipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'opus',
          localField: 'opusId',
          foreignField: '_id',
          as: 'opusData'
        }
      },
      {
        $unwind: {
          path: '$opusData',
          preserveNullAndEmptyArrays: false
        }
      }
    ];

    const compMatch: FilterQuery<CompositionDTO>[] = [];

    if (hasSearch) {
      const compFields = ['title.uk', 'title.en'];
      const opusFields = ['opusData.title.uk', 'opusData.title.en'];

      compMatch.push(
        buildAllWordsPresent<CompositionDTO>(searchWords, [compFields, opusFields, [...compFields, ...opusFields]])
      );
    }

    const allCategoryKeys: string[] = namedFilterHelper(category);
    const specialKeys = new Set<string>(['with-opus', 'without-opus']);

    const regularCategoryKeys = allCategoryKeys.filter((key: string) => !specialKeys.has(key));
    const selectedSpecialKeys = allCategoryKeys.filter((key: string) => specialKeys.has(key));

    if (regularCategoryKeys.length > 0) {
      const categoryDocs = await Category.find({ key: { $in: regularCategoryKeys } })
        .select('_id')
        .lean();
      const categoryIds = categoryDocs.map((d) => d._id);

      if (categoryIds.length) {
        compMatch.push({ categories: { $in: categoryIds } });
      } else {
        return [];
      }
    }

    if (selectedSpecialKeys.length > 0) {
      const isWithOpus = selectedSpecialKeys.includes('with-opus');
      const isWithoutOpus = selectedSpecialKeys.includes('without-opus');

      if (!(isWithOpus && isWithoutOpus)) {
        const regexPattern = isWithOpus ? /^op/i : /^sine op/i;
        compMatch.push({ 'opusData.number': { $regex: regexPattern } } as FilterQuery<CompositionDTO>);
      }
    }

    const genreKeys = namedFilterHelper(genre);
    if (genreKeys.length) {
      const genreDocs = await Genre.find({ key: { $in: genreKeys } })
        .select('_id')
        .lean();
      const genreIds = genreDocs.map((d) => d._id);

      if (genreIds.length) {
        compMatch.push({ genres: { $in: genreIds } });
      } else {
        return [];
      }
    }

    const yearCond: { $gte?: number; $lte?: number } = {};
    if (yearFrom != null) yearCond.$gte = yearFrom;
    if (yearTo != null) yearCond.$lte = yearTo;
    if (Object.keys(yearCond).length) {
      compMatch.push({ year: yearCond });
    }

    if (compMatch.length > 0) {
      compositionPipeline.push({
        $match: compMatch.length === 1 ? compMatch[0] : { $and: compMatch }
      });
    }

    compositionPipeline.push({
      $project: {
        _id: 1,
        title: 1,
        kind: { $literal: 'composition' },
        opusNumber: '$opusData.number'
      }
    });

    const compositionTitles = await Compositions.aggregate(compositionPipeline).exec();

    const opusPipeline: PipelineStage[] = [];

    const opusMatch: FilterQuery<OpusDTO> = {};

    if (hasSearch) {
      opusMatch.$and = buildWordSearchConditions<OpusDTO>(searchWords, ['title.uk', 'title.en']);
    }

    const opusYearCond: { $gte?: number; $lte?: number } = {};
    if (yearFrom != null) opusYearCond.$gte = yearFrom;
    if (yearTo != null) opusYearCond.$lte = yearTo;
    if (Object.keys(opusYearCond).length) {
      if (!opusMatch.$and) opusMatch.$and = [];
      opusMatch.$and.push({ releaseYear: opusYearCond });
    }

    if (Object.keys(opusMatch).length > 0) {
      opusPipeline.push({ $match: opusMatch });
    }

    opusPipeline.push({
      $project: {
        _id: 1,
        title: 1,
        kind: { $literal: 'opus' },
        opusNumber: '$number'
      }
    });

    const opusTitles = await Opus.aggregate(opusPipeline).exec();
    type AggregatedItem = (typeof compositionTitles)[number];
    const allTitlesMap = new Map<string, AggregatedItem>();

    [...compositionTitles, ...opusTitles].forEach((item) => {
      const key = item._id.toString();
      if (!allTitlesMap.has(key)) {
        allTitlesMap.set(key, item);
      }
    });

    const allTitles = Array.from(allTitlesMap.values()).filter((item) => parseOpus(item.opusNumber) !== null);

    return ArraySchema(compositionTitlesSchema).parse(allTitles);
  },

  async getOpusById(id: string): Promise<OpusWithCompositionsLean | null> {
    await dbConnect();

    if (!OBJECT_ID_REGEX.test(id)) {
      return null;
    }

    const opus = await Opus.findById(id).lean<OpusLean | null>();

    if (!opus) {
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
    filters?: { categories?: string[]; genres?: string[]; years?: { min?: number; max?: number } }
  ) {
    await dbConnect();

    const conditions: Condition[] = [];

    const readySearchExpression = searchHelper(search);
    if (readySearchExpression) {
      const pattern = readySearchExpression;
      const matchingOpuses = await Opus.find({
        $or: [{ 'title.uk': { $regex: pattern, $options: 'i' } }, { 'title.en': { $regex: pattern, $options: 'i' } }]
      })
        .select('_id')
        .lean();

      conditions.push({
        $or: [
          { 'title.uk': { $regex: pattern, $options: 'i' } },
          { 'title.en': { $regex: pattern, $options: 'i' } },
          { opusId: { $in: matchingOpuses.map((o) => o._id) } }
        ]
      });
    }

    const readyGenreArray = namedFilterHelper(filters?.genres);
    if (readyGenreArray.length > 0) {
      const genresIds = await Genre.find({ key: { $in: readyGenreArray } })
        .select('_id')
        .lean();
      conditions.push({ genres: { $in: genresIds } });
    }

    const allCategoryKeys: string[] = namedFilterHelper(filters?.categories) || [];
    const specialKeys = new Set<string>(['with-opus', 'without-opus']);

    const regularCategoryKeys = allCategoryKeys.filter((key: string) => !specialKeys.has(key));
    const selectedSpecialKeys = allCategoryKeys.filter((key: string) => specialKeys.has(key));

    if (regularCategoryKeys.length > 0) {
      const categoryIds = await Category.find({ key: { $in: regularCategoryKeys } })
        .select('_id')
        .lean();

      conditions.push({ categories: { $in: categoryIds } });
    }

    if (selectedSpecialKeys.length > 0) {
      const isWithOpus = selectedSpecialKeys.includes('with-opus');
      const isWithoutOpus = selectedSpecialKeys.includes('without-opus');

      if (!(isWithOpus && isWithoutOpus)) {
        const regexPattern = isWithOpus ? /^op/i : /^sine op/i;

        const matchingOpuses = await Opus.find({ number: { $regex: regexPattern } })
          .select('_id')
          .lean();

        const matchingOpusIds = matchingOpuses.map((o) => o._id);

        conditions.push({ opusId: { $in: matchingOpusIds } });
      }
    }

    const readyYearObject = yearHelper(filters?.years);
    if (readyYearObject) conditions.push({ year: { $gte: readyYearObject.min, $lte: readyYearObject.max } });

    conditions.push({ opusId: { $exists: true, $ne: null } });

    let query: Query = {};
    if (conditions.length === 1) query = conditions[0];
    else if (conditions.length > 1) query = { $and: conditions };

    const compositions = await Compositions.find(query)
      .populate('genres')
      .populate('categories')
      .populate({ path: 'opusId', model: Opus })
      .lean();

    if (!compositions || compositions.length === 0) return [];

    const parsedCompositions = ArraySchema(compositionSchema)
      .parse(compositions)
      .filter((comp) => parseOpus(comp.opusId?.number) !== null);

    return parsedCompositions.sort((a, b) => {
      const parsedA = parseOpus(a.opusId?.number)!;
      const parsedB = parseOpus(b.opusId?.number)!;

      if (parsedA.prefix !== parsedB.prefix) {
        return parsedA.prefix === 'op' ? -1 : 1;
      }
      if (parsedA.num !== parsedB.num) {
        return parsedA.num - parsedB.num;
      }
      const cleanA = parsedA.rest.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanB = parsedB.rest.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cleanA.localeCompare(cleanB, undefined, { numeric: true, sensitivity: 'base' });
    });
  }
};

function newCompositionsRepo(): typeof compositionsRepository {
  return compositionsRepository;
}

export default newCompositionsRepo;
