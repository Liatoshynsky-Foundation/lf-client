import { FilterQuery, PipelineStage } from 'mongoose';

import { CompositionsTitleFilters } from '~/types/types/tableFilters.types';

import { CompositionDTO, Condition, OpusDTO, Query } from '~/domain/dto/composition.dto';
import dbConnect from '~/infrastructure/db/connect';
import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { parseFullOpus as parseOpus } from '~/lib/utils/opusParser';
import { parseGenreString } from '~/lib/utils/parseGenreString';
import { namedFilterHelper, searchHelper, yearHelper } from '~/lib/utils/searchAndFiltersHelpers';
import { compositionSchema, compositionTitlesSchema } from '~/validators/artistry/composition.schema';
import { namedFilterSchema } from '~/validators/artistry/namedFilter.schema';
import { ArraySchema } from '~/validators/constants';

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

const compositionsRepository = {
  async getAllGenres() {
    await dbConnect();
    const rawGenres = await Opus.distinct('genre');
    const parsedGenres = (rawGenres as (string | null)[]).flatMap(parseGenreString);

    return Array.from(new Set(parsedGenres));
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
            allYears: [
              {
                $ifNull: [toNumericYearField('$creationYear'), toNumericYearField('$releaseYear')]
              },
              toNumericYearField('$endYear')
            ]
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
        { $match: { opusId: { $exists: true, $ne: null }, year: { $gte: COMPOSITION_YEAR_FLOOR, $lte: now } } },
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

  async getAllCompositionTitles(filters: CompositionsTitleFilters = {}) {
    await dbConnect();

    const { search, category, yearFrom, yearTo } = filters;

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
      },
      {
        $match: {
          'opusData.status': { $ne: 'draft' }
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

    const opusMatch: FilterQuery<OpusDTO> = { status: { $ne: 'draft' } };

    if (hasSearch) {
      if (!opusMatch.$and) opusMatch.$and = [];
      opusMatch.$and.push(...buildWordSearchConditions<OpusDTO>(searchWords, ['title.uk', 'title.en']));
    }

    const yearCondNum: { $gte?: number; $lte?: number } = {};
    const yearCondStr: { $gte?: string; $lte?: string } = {};

    if (yearFrom != null) {
      yearCondNum.$gte = yearFrom;
      yearCondStr.$gte = String(yearFrom);
    }
    if (yearTo != null) {
      yearCondNum.$lte = yearTo;
      yearCondStr.$lte = String(yearTo);
    }

    if (Object.keys(yearCondNum).length) {
      if (!opusMatch.$and) opusMatch.$and = [];
      opusMatch.$and.push({
        $or: [
          { creationYear: yearCondStr },
          { creationYear: yearCondNum },
          { endYear: yearCondStr },
          { endYear: yearCondNum },
          { releaseYear: yearCondNum }
        ]
      });
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

  async getAllCompositions(
    search?: string,
    filters?: { categories?: string[]; years?: { min?: number; max?: number } }
  ) {
    await dbConnect();

    const conditions: Condition[] = [];

    const readySearchExpression = searchHelper(search);
    if (readySearchExpression) {
      const pattern = readySearchExpression;
      const matchingOpuses = await Opus.find({
        status: { $ne: 'draft' },
        $or: [
          { 'title.uk': { $regex: pattern, $options: 'i' } },
          { 'title.en': { $regex: pattern, $options: 'i' } },
          { genre: { $regex: pattern, $options: 'i' } }
        ]
      })
        .select('_id')
        .lean();

      conditions.push({
        $or: [
          { 'title.uk': { $regex: pattern, $options: 'i' } },
          { 'title.en': { $regex: pattern, $options: 'i' } },
          { genre: { $regex: pattern, $options: 'i' } },
          { opusId: { $in: matchingOpuses.map((o) => o._id) } }
        ]
      });
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
    if (readyYearObject) {
      const minNum = readyYearObject.min;
      const maxNum = readyYearObject.max;

      const yearFilterNum = { $gte: minNum, $lte: maxNum };
      const yearFilterStr = { $gte: String(minNum), $lte: String(maxNum) };

      const activeOpuses = await Opus.find({
        status: { $ne: 'draft' },
        $or: [
          { creationYear: yearFilterStr },
          { creationYear: yearFilterNum },
          { creationYear: null, releaseYear: yearFilterNum },
          { endYear: yearFilterStr },
          { endYear: yearFilterNum }
        ]
      })
        .select('_id')
        .lean();

      const opusIds = activeOpuses.map((o) => o._id);
      conditions.push({
        $or: [{ year: yearFilterNum }, { year: yearFilterStr }, { opusId: { $in: opusIds } }]
      } as Condition);
    }

    conditions.push({ opusId: { $exists: true, $ne: null } });

    let query: Query = {};
    if (conditions.length === 1) query = conditions[0];
    else if (conditions.length > 1) query = { $and: conditions };

    const compositions = await Compositions.find(query)
      .populate('categories')
      .populate({ path: 'opusId', model: Opus })
      .lean();

    if (!compositions || compositions.length === 0) return [];

    const parsedCompositions = ArraySchema(compositionSchema)
      .parse(compositions)
      .filter((comp) => {
        const opusNumber = typeof comp.opusId === 'object' && comp.opusId ? comp.opusId.number : undefined;
        return parseOpus(opusNumber) !== null;
      })
      .filter((comp) => {
        if (typeof comp.opusId === 'object' && comp.opusId?.status === 'draft') return false;
        return true;
      });

    return parsedCompositions.sort((a, b) => {
      const numA = typeof a.opusId === 'object' && a.opusId ? a.opusId.number : undefined;
      const numB = typeof b.opusId === 'object' && b.opusId ? b.opusId.number : undefined;

      const parsedA = parseOpus(numA)!;
      const parsedB = parseOpus(numB)!;

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
