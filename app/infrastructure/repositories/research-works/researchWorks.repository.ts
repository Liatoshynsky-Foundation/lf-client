import { FilterQuery } from 'mongoose';

import { ResearchWorkDb } from '~/types/types/researchWorks.types';
import { ResearchWorksDescriptionFilters } from '~/types/types/tableFilters.types';

import { ResearchWorkStatus } from '~/domain/dto/researchWorks.dto';
import dbConnect from '~/infrastructure/db/connect';
import { ResearchWorks } from '~/infrastructure/models/research-works/researchWorksTableData';
import { searchHelper } from '~/lib/utils/searchAndFiltersHelpers';
import { researchWorksSchema } from '~/validators/researchWorks.schema';

const researchWorksRepository = {
  async getAllAuthors(): Promise<string[]> {
    await dbConnect();

    return ResearchWorks.distinct('author', {
      status: ResearchWorkStatus.Published
    });
  },

  async getAllBibliographicDescriptions(filters: ResearchWorksDescriptionFilters = {}): Promise<string[]> {
    await dbConnect();

    const { yearFrom, yearTo, author, search } = filters;

    const conditions: FilterQuery<ResearchWorkDb>[] = [{ status: ResearchWorkStatus.Published }];

    if (search?.trim()) {
      const pattern = searchHelper(search);
      conditions.push({
        bibliographicDescription: { $regex: pattern, $options: 'i' }
      });
    }

    if (author?.length) {
      conditions.push({
        author: { $in: author }
      });
    }

    const yearCondition: { $gte?: string; $lte?: string } = {};
    if (yearFrom != null) yearCondition.$gte = String(yearFrom);
    if (yearTo != null) yearCondition.$lte = String(yearTo);
    if (Object.keys(yearCondition).length) {
      conditions.push({ year: yearCondition });
    }

    return ResearchWorks.distinct('bibliographicDescription', {
      $and: conditions
    });
  },

  async getResearchWorksYearRange() {
    await dbConnect();

    const aggregation = await ResearchWorks.aggregate([
      {
        $match: {
          status: ResearchWorkStatus.Published,
          year: { $regex: /^\d{4}$/ }
        }
      },
      {
        $addFields: {
          yearNumber: { $toInt: '$year' }
        }
      },
      {
        $group: {
          _id: null,
          minYear: { $min: '$yearNumber' },
          maxYear: { $max: '$yearNumber' }
        }
      }
    ]);

    const row = aggregation[0];
    const now = new Date().getFullYear();

    return {
      minYear: row?.minYear ?? 1900,
      maxYear: row?.maxYear ?? now
    };
  },

  async getAllResearchWorks({
    author,
    years,
    search = ''
  }: {
    years?: [number, number];
    author?: string[];
    search?: string;
  }): Promise<ResearchWorkDb[]> {
    await dbConnect();

    const conditions: FilterQuery<ResearchWorkDb>[] = [{ status: ResearchWorkStatus.Published }];

    if (search.trim()) {
      const pattern = searchHelper(search);

      conditions.push({
        bibliographicDescription: { $regex: pattern, $options: 'i' }
      });
    }

    if (author?.length) {
      conditions.push({
        author: { $in: author }
      });
    }

    if (years) {
      const [min, max] = years;

      conditions.push({
        year: {
          $gte: String(min),
          $lte: String(max)
        }
      });
    }

    const works = await ResearchWorks.find({
      $and: conditions
    }).lean();

    if (!works.length) return [];

    return researchWorksSchema.parse(works);
  }
};

function newResearchWorksRepo(): typeof researchWorksRepository {
  return researchWorksRepository;
}

export default newResearchWorksRepo;
