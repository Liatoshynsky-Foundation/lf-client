import { Locale } from 'next-intl';

import { WorkTableFilters } from '~/types/types/tableFilters.types';

import { ScientificWorksRepository } from '~/infrastructure/repositories/scientific-works/scientificWorks.repo';
import { ArraySchema, namedFilterSchema, NoIDSchema } from '~/validators/constants';
import { LocalizeSchema } from '~/validators/localization';
import { scientificWorkTitleSchema } from '~/validators/scientific-works/scientificWorks.schema';

export const createScientificWorksService = ({
  scientificWorksRepo
}: {
  scientificWorksRepo: ScientificWorksRepository;
}) => ({
  async getAllAuthors(locale: Locale) {
    const authors = await scientificWorksRepo.getAllAuthors(['name', 'surname']);

    const normalized = authors.map(({ _id, surname, name }) => ({
      key: _id.toString(),
      name: {
        uk: `${surname.uk} ${name.uk}`,
        en: `${surname.en} ${name.en}`
      }
    }));

    return ArraySchema(LocalizeSchema(NoIDSchema(namedFilterSchema), locale)).parse(normalized);
  },

  async getAllScientificTitles(locale: Locale, filters: WorkTableFilters) {
    const titles = await scientificWorksRepo.getAllScientificTitles(filters);

    return ArraySchema(LocalizeSchema(scientificWorkTitleSchema, locale)).parse(titles);
  },

  async getScientificWorksYearRange() {
    return scientificWorksRepo.getScientificWorksYearRange();
  },

  async getAllScientificWorks(locale: Locale, filters: WorkTableFilters) {
    const { author, yearFrom, yearTo, search } = filters;

    const years: [number, number] | undefined = yearFrom != null && yearTo != null ? [yearFrom, yearTo] : undefined;

    const works = await scientificWorksRepo.getAllScientificWorks({
      author,
      years,
      search
    });

    return works.map((work) => {
      const { _id, title, authors, startYear, endYear, url, isPreview } = work;

      const localizedTitle = title[locale];

      const localizedAuthors = authors.map(({ name, surname }) => `${surname[locale]} ${name[locale]}`).join(', ');

      return {
        id: _id.toString(),
        name: localizedTitle,
        author: localizedAuthors,
        sortableYear: startYear,
        year: endYear ? `${startYear}-${endYear}` : String(startYear),
        url,
        isPreview
      };
    });
  }
});
