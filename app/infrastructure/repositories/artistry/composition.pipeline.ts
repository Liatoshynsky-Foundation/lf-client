import type { FilterQuery, PipelineStage } from 'mongoose';

import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { yearHelper } from '~/lib/utils/searchAndFiltersHelpers';
import { OpusDocument } from '~/validators/artistry/composition.schema';

export const COMPOSITION_YEAR_FLOOR = 1900;

export function toNumericYearField(field: string) {
  return { $convert: { input: field, to: 'double', onError: null, onNull: null } };
}

export function combineYearRanges(
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

export function getPublishedOpusMatchCondition(): FilterQuery<OpusDocument> {
  return {
    status: { $ne: 'draft' },
    creationYear: { $nin: [null, ''] },
    $or: [{ 'name.uk': { $nin: [null, ''] } }, { 'name.en': { $nin: [null, ''] } }]
  };
}

export function getBaseAggregatePipeline(): PipelineStage[] {
  return [
    {
      $match: getPublishedOpusMatchCondition()
    },
    {
      $lookup: {
        from: 'compositions',
        localField: 'compositions',
        foreignField: '_id',
        as: 'populatedCompositions'
      }
    },
    {
      $addFields: {
        compositions: {
          $filter: {
            input: {
              $map: {
                input: { $ifNull: ['$compositions', []] },
                as: 'compId',
                in: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$populatedCompositions',
                        as: 'popComp',
                        cond: { $eq: ['$$popComp._id', '$$compId'] }
                      }
                    },
                    0
                  ]
                }
              }
            },
            as: 'mappedComp',
            cond: { $ne: ['$$mappedComp', null] }
          }
        }
      }
    },
    {
      $project: {
        populatedCompositions: 0
      }
    }
  ];
}

export interface PipelineFilterContext {
  categoryKeys?: string[];
  years?: { min?: number; max?: number };
}

export interface PipelineFilterHandler {
  build(context: PipelineFilterContext): Promise<FilterQuery<OpusDocument> | null> | FilterQuery<OpusDocument> | null;
}

export class OpusSpecialKeyHandler implements PipelineFilterHandler {
  build(context: PipelineFilterContext): FilterQuery<OpusDocument> | null {
    const selectedSpecialKeys = (context.categoryKeys || []).filter((key) =>
      ['with-opus', 'without-opus'].includes(key)
    );
    if (selectedSpecialKeys.length === 0) return null;
    const isWithOpus = selectedSpecialKeys.includes('with-opus');
    const isWithoutOpus = selectedSpecialKeys.includes('without-opus');
    if (isWithOpus && isWithoutOpus) return null;
    return { numberKind: isWithOpus ? 'op' : 'sineop' };
  }
}

export class OpusYearHandler implements PipelineFilterHandler {
  build(context: PipelineFilterContext): FilterQuery<OpusDocument> | null {
    const readyYearObject = yearHelper(context.years);
    if (!readyYearObject) return null;

    const minStr = String(readyYearObject.min);
    const maxStr = String(readyYearObject.max);

    return {
      $or: [
        { creationYear: { $gte: minStr, $lte: maxStr } },
        { endYear: { $gte: minStr, $lte: maxStr } },
        { 'compositions.year': { $gte: readyYearObject.min, $lte: readyYearObject.max } },
        { 'compositions.year': null },
        { 'compositions.year': { $exists: false } }
      ]
    };
  }
}

export class OpusCategoryHandler implements PipelineFilterHandler {
  async build(context: PipelineFilterContext): Promise<FilterQuery<OpusDocument> | null> {
    const regularCategoryKeys = (context.categoryKeys || []).filter(
      (key) => !['with-opus', 'without-opus'].includes(key)
    );

    if (regularCategoryKeys.length === 0) return null;

    const categoryIds = await Category.find({ key: { $in: regularCategoryKeys } })
      .select('_id')
      .lean();

    if (categoryIds.length === 0) {
      return { _id: { $exists: false } };
    }

    return { 'compositions.categories': { $in: categoryIds.map((c) => c._id) } };
  }
}

export class PipelineQueryBuilder {
  private readonly handlers: PipelineFilterHandler[] = [];

  register(handler: PipelineFilterHandler) {
    this.handlers.push(handler);
    return this;
  }

  async build(
    context: PipelineFilterContext
  ): Promise<{ conditions: FilterQuery<OpusDocument>[]; noCategoryMatches: boolean }> {
    const conditions: FilterQuery<OpusDocument>[] = [];
    let noCategoryMatches = false;

    for (const handler of this.handlers) {
      const condition = await handler.build(context);
      if (condition) {
        const idCondition = (condition as Record<string, unknown>)._id as { $exists?: boolean } | undefined;
        if (idCondition?.$exists === false) {
          noCategoryMatches = true;
          break;
        }
        conditions.push(condition);
      }
    }

    return { conditions, noCategoryMatches };
  }
}

export async function buildCommonAndConditions(
  categoryKeys: string[] | undefined,
  years: { min?: number; max?: number } | undefined
): Promise<{ conditions: FilterQuery<OpusDocument>[]; noCategoryMatches: boolean }> {
  const builder = new PipelineQueryBuilder()
    .register(new OpusSpecialKeyHandler())
    .register(new OpusCategoryHandler())
    .register(new OpusYearHandler());

  return builder.build({ categoryKeys, years });
}

export function buildOpusYearRangePipeline(now: number): PipelineStage[] {
  return [
    { $match: getPublishedOpusMatchCondition() },
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
  ];
}

export function buildCompositionYearRangePipeline(now: number): PipelineStage[] {
  return [
    { $match: { year: { $gte: COMPOSITION_YEAR_FLOOR, $lte: now } } },
    {
      $group: {
        _id: null,
        minYear: { $min: '$year' },
        maxYear: { $max: '$year' }
      }
    }
  ];
}

export function buildAllCompositionsPipeline(conditions: FilterQuery<OpusDocument>[]): PipelineStage[] {
  const pipeline: PipelineStage[] = [...getBaseAggregatePipeline()];

  if (conditions.length > 0) {
    pipeline.push(
      {
        $unwind: {
          path: '$compositions',
          preserveNullAndEmptyArrays: false
        }
      },
      { $match: { $and: conditions } },
      {
        $group: {
          _id: '$_id',
          root: { $first: '$$ROOT' },
          compositions: { $push: '$compositions' }
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$root', { compositions: '$compositions' }]
          }
        }
      }
    );
  }

  pipeline.push({
    $sort: { numberKind: 1 as const, number: 1 as const, additionalText: 1 as const }
  });

  return pipeline;
}
