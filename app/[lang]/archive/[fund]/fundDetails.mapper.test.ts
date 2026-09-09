import { getFundSummaryTitle, mapFundCasesToDocuments, mapFundDetailsToSummaryData } from './fundDetails.mapper';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import type { LocalizedTipTapDoc } from '~/types/types/tiptap.types';

import { type FundDetailsDTO, FundStatus } from '~/domain/dto/funds.dto';

const characterAndContent: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [{ type: TipTapNodeTypes.text, text: 'Український опис' }]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [{ type: TipTapNodeTypes.text, text: 'English description' }]
      }
    ]
  }
};

const fund: FundDetailsDTO = {
  id: 2,
  number: { uk: 'Фонд 2', en: 'Fund 2' },
  title: { uk: 'Особисті документи', en: 'Personal Documents' },
  numberOfDescriptions: 2,
  numberOfCases: 9,
  organizationForm: { uk: 'тематико-хронологічна', en: 'thematic-chronological' },
  documentCreationDate: '1895-1971',
  chronologicalBoundaries: '1895-1971',
  documentLanguages: 'українська, польська',
  characterAndContent,
  accessConditions: 'Доступ вільний',
  compilerInfo: 'Ірина Тукова',
  status: FundStatus.Published,
  cases: [
    {
      _id: 'case-1',
      cipher: 'Ф. 2, оп. 1, спр. 1',
      name: { uk: 'Документи', en: 'Documents' },
      dates: { uk: '1901', en: '1901' },
      sheets: 11,
      contentDescription: { uk: 'Опис справи', en: 'Case description' },
      pdfUrl: '/case.pdf',
      order: 1,
      status: FundStatus.Published
    },
    {
      _id: 'case-draft',
      cipher: 'Ф. 2, оп. 1, спр. 2',
      name: { uk: 'Чернетка', en: 'Draft' },
      dates: { uk: '1902', en: '1902' },
      sheets: 2,
      contentDescription: { uk: 'Не показувати', en: 'Do not render' },
      pdfUrl: null,
      order: 2,
      status: FundStatus.Draft
    }
  ]
};

describe('fundDetails.mapper', () => {
  it('should build a localized fund summary title', () => {
    expect(getFundSummaryTitle(fund, 'uk')).toBe('Фонд 2. Особисті документи');
    expect(getFundSummaryTitle(fund, 'en')).toBe('Fund 2. Personal Documents');
  });

  it('should map fund details to FundSummaryHeader data', () => {
    const result = mapFundDetailsToSummaryData(fund);

    expect(result.items).toHaveLength(9);
    expect(result.items[0]?.title.uk).toBe('Кількість описів');
    expect(result.items[0]?.description.uk.content[0]?.content?.[0]).toEqual({
      type: TipTapNodeTypes.text,
      text: '2'
    });
    expect(result.items[3]?.description).toBe(characterAndContent);
  });

  it('should skip empty optional summary fields', () => {
    const result = mapFundDetailsToSummaryData({
      ...fund,
      organizationForm: undefined,
      characterAndContent: undefined,
      documentLanguages: '',
      accessConditions: '',
      compilerInfo: undefined,
      chronologicalBoundaries: ''
    });

    expect(result.items.map((item) => item.title.en)).toEqual([
      'Number of inventories',
      'Number of cases',
      'Date of document creation'
    ]);
  });

  it('should localize published cases for the document table and exclude drafts', () => {
    expect(mapFundCasesToDocuments(fund.cases, 'en')).toEqual([
      {
        id: 'case-1',
        cipher: 'Ф. 2, оп. 1, спр. 1',
        name: 'Documents',
        dates: '1901',
        sheets: 11,
        contentDescription: 'Case description',
        pdfUrl: '/case.pdf'
      }
    ]);
  });
});
