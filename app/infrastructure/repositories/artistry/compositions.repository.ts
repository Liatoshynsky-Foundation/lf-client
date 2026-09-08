import {
  buildAllCompositionsPipeline,
  buildCommonAndConditions,
  buildCompositionYearRangePipeline,
  buildOpusYearRangePipeline,
  combineYearRanges
} from './composition.pipeline';
import { CompositionRepository } from './compositions.repo';

import { CompositionQueryFilters } from '~/domain/dto/composition.dto';
import dbConnect from '~/infrastructure/db/connect';
import { Category } from '~/infrastructure/models/artistry/artistryCategoriesData';
import { Opus } from '~/infrastructure/models/artistry/artistryOpusData';
import { Compositions } from '~/infrastructure/models/artistry/artistryTableData';
import { namedFilterHelper } from '~/lib/utils/searchAndFiltersHelpers';
import {
  compositionsYearRangeSchema,
  opusListSchema,
  opusSchema,
  RawOpusDetailsDTO,
  RawOpusListItemDTO,
  RawYearRangeDTO
} from '~/validators/artistry/composition.schema';
import { ArraySchema, namedFilterSchema, RawCategoryDTO } from '~/validators/constants';

class CompositionsRepositoryImpl implements CompositionRepository {
  async getAllCategories(): Promise<RawCategoryDTO[]> {
    await dbConnect();
    const categories = await Category.find().lean();
    return ArraySchema(namedFilterSchema).parse(categories);
  }

  async getCompositionsYearRange(): Promise<RawYearRangeDTO> {
    await dbConnect();
    const now = new Date().getFullYear();

    const [opusAgg, compositionsAgg] = await Promise.all([
      Opus.aggregate(buildOpusYearRangePipeline(now)),
      Compositions.aggregate(buildCompositionYearRangePipeline(now))
    ]);

    const opusRow = Array.isArray(opusAgg) && opusAgg.length > 0 ? opusAgg[0] : null;
    const compositionsRow = Array.isArray(compositionsAgg) && compositionsAgg.length > 0 ? compositionsAgg[0] : null;

    const rawYearRange = combineYearRanges([opusRow, compositionsRow], now);
    const parsedYearRange = compositionsYearRangeSchema.parse(rawYearRange);

    return parsedYearRange;
  }

  async getAllCompositions(filters?: CompositionQueryFilters): Promise<RawOpusListItemDTO[]> {
    await dbConnect();

    const { conditions, noCategoryMatches } = await buildCommonAndConditions(
      namedFilterHelper(filters?.categories),
      filters?.years
    );

    if (noCategoryMatches) return [];

    const opuses = await Opus.aggregate(buildAllCompositionsPipeline(conditions)).exec();

    if (!opuses || opuses.length === 0) return [];
    return ArraySchema(opusListSchema).parse(opuses);
  }

  async getOpusBySlug(slug: string): Promise<RawOpusDetailsDTO | null> {
    await dbConnect();
    const opus = await Opus.findOne({ slug, status: { $ne: 'draft' } })
      .populate('compositions')
      .lean<RawOpusDetailsDTO>();
    if (!opus) return null;
    return opusSchema.parse(opus);
  }
}

function newCompositionsRepository(): CompositionRepository {
  return new CompositionsRepositoryImpl();
}
export default newCompositionsRepository;
