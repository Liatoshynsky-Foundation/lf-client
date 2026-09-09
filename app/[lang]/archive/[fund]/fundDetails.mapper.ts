import type { Locale } from 'next-intl';

import type {
  FundSummaryHeaderData,
  FundSummaryHeaderDataItem
} from '~/components/blocks/fund-summary-header/FundSummaryHeader';

import type { LocalizedString } from '~/types/types/common.types';
import type { DocumentRecord } from '~/types/types/document.types';
import type { LocalizedTipTapDoc } from '~/types/types/tiptap.types';

import { type CaseDTO, type FundDetailsDTO, FundStatus } from '~/domain/dto/funds.dto';
import { createTipTapDocFromText } from '~/lib/utils/tiptapHelpers';

type LocalizedTextValue = LocalizedString | string | undefined;
type RequiredLocalizedTextValue = Exclude<LocalizedTextValue, undefined>;

const getLocalizedText = (value: LocalizedTextValue, locale: Locale): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;

  return value[locale] || value.uk || value.en || '';
};

const hasLocalizedText = (value: LocalizedTextValue): boolean => {
  if (!value) return false;
  if (typeof value === 'string') return value.trim().length > 0;

  return Boolean(value.uk?.trim() || value.en?.trim());
};

const textToLocalizedTipTapDoc = (value: RequiredLocalizedTextValue): LocalizedTipTapDoc => {
  if (typeof value === 'string') {
    const doc = createTipTapDocFromText(value);
    return { uk: doc, en: doc };
  }

  return {
    uk: createTipTapDocFromText(value.uk),
    en: createTipTapDocFromText(value.en)
  };
};

const createSummaryItem = (title: LocalizedString, description: LocalizedTipTapDoc): FundSummaryHeaderDataItem => ({
  title,
  description
});

const createTextSummaryItem = (title: LocalizedString, value: RequiredLocalizedTextValue): FundSummaryHeaderDataItem =>
  createSummaryItem(title, textToLocalizedTipTapDoc(value));

const appendOptionalTextItem = (
  items: FundSummaryHeaderDataItem[],
  title: LocalizedString,
  value: LocalizedTextValue
) => {
  if (!value || !hasLocalizedText(value)) return;

  items.push(createTextSummaryItem(title, value));
};

export const getFundSummaryTitle = (fund: FundDetailsDTO, locale: Locale): string =>
  [getLocalizedText(fund.number, locale), getLocalizedText(fund.title, locale)].filter(Boolean).join('. ');

export const mapFundDetailsToSummaryData = (fund: FundDetailsDTO): FundSummaryHeaderData => {
  const items: FundSummaryHeaderDataItem[] = [
    createTextSummaryItem({ uk: 'Кількість описів', en: 'Number of inventories' }, String(fund.numberOfDescriptions))
  ];

  appendOptionalTextItem(items, { uk: 'Мова документів', en: 'Language of documents' }, fund.documentLanguages);

  items.push(createTextSummaryItem({ uk: 'Кількість справ', en: 'Number of cases' }, String(fund.numberOfCases)));

  if (fund.characterAndContent) {
    items.push(
      createSummaryItem(
        { uk: 'Характер і зміст документів', en: 'Nature and content of documents' },
        fund.characterAndContent
      )
    );
  }

  appendOptionalTextItem(items, { uk: 'Форма упорядкування', en: 'Form of arrangement' }, fund.organizationForm);
  appendOptionalTextItem(items, { uk: 'Умови доступу', en: 'Access conditions' }, fund.accessConditions);
  appendOptionalTextItem(
    items,
    { uk: 'Дата утворення документів', en: 'Date of document creation' },
    fund.documentCreationDate
  );
  appendOptionalTextItem(
    items,
    { uk: 'Відомості про укладача', en: 'Information about the compiler' },
    fund.compilerInfo
  );
  appendOptionalTextItem(
    items,
    { uk: 'Хронологічні межі', en: 'Chronological boundaries' },
    fund.chronologicalBoundaries
  );

  return { items };
};

export const mapFundCasesToDocuments = (cases: CaseDTO[], locale: Locale): DocumentRecord[] =>
  cases
    .filter((caseItem) => caseItem.status === FundStatus.Published)
    .map((caseItem) => ({
      id: caseItem._id,
      cipher: caseItem.cipher,
      name: getLocalizedText(caseItem.name, locale),
      dates: getLocalizedText(caseItem.dates, locale),
      sheets: caseItem.sheets,
      contentDescription: getLocalizedText(caseItem.contentDescription, locale),
      pdfUrl: caseItem.pdfUrl
    }));
