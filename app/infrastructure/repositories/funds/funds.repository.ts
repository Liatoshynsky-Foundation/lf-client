import '~/infrastructure/models/archive/Document';

import type { FundsRepository } from './funds.repo';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import type { LocalizedString } from '~/types/types/common.types';
import type { LocalizedTipTapDoc, TipTapDoc } from '~/types/types/tiptap.types';

import { CaseDetailsDTO, CaseDTO, DocumentDTO, FundBaseDTO, FundDetailsDTO, FundStatus } from '~/domain/dto/funds.dto';
import dbConnect from '~/infrastructure/db/connect';
import { Case, ICase } from '~/infrastructure/models/archive/Case';
import { Fund, IFund } from '~/infrastructure/models/archive/Fund';
import { createTipTapDocFromText } from '~/lib/utils/tiptapHelpers';

type FundWithCases = IFund & { cases?: ICase[] };
type CaseWithDocuments = ICase & { documents?: { _id: string; order: number; text: string }[] };
type AdjacentCase = Pick<ICase, '_id' | 'cipher' | 'name' | 'descriptionNumber' | 'caseNumber' | 'caseName' | 'order'>;
type LocalizedStringValue = string | Partial<LocalizedString> | null | undefined;

const toObjectIdString = (id: { toString(): string } | string): string => id.toString();

const createFundNumberLabel = (id: number): LocalizedString => ({
  uk: `Фонд ${id}`,
  en: `Fund ${id}`
});

const isTipTapDoc = (value: unknown): value is TipTapDoc =>
  typeof value === 'object' && value !== null && (value as { type?: unknown }).type === TipTapNodeTypes.doc;

const parseTipTapDoc = (value: unknown): TipTapDoc | undefined => {
  if (!value) return undefined;

  if (isTipTapDoc(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(trimmedValue) as unknown;
    return isTipTapDoc(parsed) ? parsed : createTipTapDocFromText(trimmedValue);
  } catch {
    return createTipTapDocFromText(trimmedValue);
  }
};

const normalizeLocalizedTipTapDoc = (value: IFund['characterAndContent']): LocalizedTipTapDoc | undefined => {
  if (!value) return undefined;

  if (typeof value === 'string') {
    const doc = parseTipTapDoc(value);
    return doc ? { uk: doc, en: doc } : undefined;
  }

  const uk = parseTipTapDoc(value.uk);
  const en = parseTipTapDoc(value.en);

  if (!uk && !en) {
    return undefined;
  }

  return {
    uk: uk ?? en ?? createTipTapDocFromText(''),
    en: en ?? uk ?? createTipTapDocFromText('')
  };
};

const normalizeLocalizedString = (value: LocalizedStringValue): LocalizedString | undefined => {
  if (!value) return undefined;

  if (typeof value === 'string') {
    return value.trim() ? { uk: value, en: value } : undefined;
  }

  if (!value.uk?.trim() && !value.en?.trim()) {
    return undefined;
  }

  return {
    uk: value.uk ?? '',
    en: value.en ?? ''
  };
};

const normalizeRequiredLocalizedString = (value: LocalizedStringValue): LocalizedString =>
  normalizeLocalizedString(value) ?? { uk: '', en: '' };

const getLocalizedUk = (value: LocalizedStringValue): string => normalizeRequiredLocalizedString(value).uk;

const getCaseOrder = (caseItem: Pick<ICase, 'order' | 'descriptionNumber' | 'caseNumber'>): number => {
  if (typeof caseItem.order === 'number') {
    return caseItem.order;
  }

  const descriptionNumber = caseItem.descriptionNumber ?? 0;
  const caseNumber = caseItem.caseNumber ?? 0;
  return descriptionNumber * 100000 + caseNumber;
};

const formatCipher = (
  fundNumber: number | undefined,
  caseItem: Pick<ICase, 'cipher' | 'descriptionNumber' | 'caseNumber'>
) => {
  if (caseItem.cipher) {
    return caseItem.cipher;
  }

  if (!fundNumber || !caseItem.descriptionNumber || !caseItem.caseNumber) {
    return '';
  }

  return `Ф. ${fundNumber}, оп. ${caseItem.descriptionNumber}, спр. ${caseItem.caseNumber}`;
};

const mapCaseToDTO = (fundNumber: number, caseItem: ICase): CaseDTO => ({
  _id: toObjectIdString(caseItem._id),
  cipher: formatCipher(fundNumber, caseItem),
  name: normalizeRequiredLocalizedString(caseItem.caseName ?? caseItem.name),
  dates: normalizeRequiredLocalizedString(caseItem.caseDate ?? caseItem.dates),
  sheets: caseItem.sheetsNumber ?? caseItem.sheets ?? null,
  contentDescription: normalizeRequiredLocalizedString(caseItem.caseDescriptions ?? caseItem.contentDescription),
  pdfUrl: caseItem.pdfFile?.url ?? caseItem.pdfUrl ?? null,
  order: getCaseOrder(caseItem),
  status: caseItem.status ?? FundStatus.Published
});

const buildAdjacentCase = (fundNumber: number | undefined, caseItem: AdjacentCase | null) =>
  caseItem
    ? {
        _id: toObjectIdString(caseItem._id),
        name: getLocalizedUk(caseItem.caseName ?? caseItem.name),
        cipher: formatCipher(fundNumber, caseItem)
      }
    : null;

export const fundsRepository: FundsRepository = {
  async getFunds(): Promise<FundBaseDTO[]> {
    await dbConnect();

    const funds = await Fund.find({ status: FundStatus.Published }).sort({ id: 1 }).lean<IFund[]>();

    return funds.map((fund) => ({
      id: fund.id,
      number: createFundNumberLabel(fund.id),
      title: fund.title,
      status: fund.status
    }));
  },

  async getFundById(id: number): Promise<FundDetailsDTO | null> {
    await dbConnect();

    const fund = await Fund.findOne({ id, status: FundStatus.Published })
      .populate({ path: 'cases', match: { status: FundStatus.Published } })
      .lean<FundWithCases>();

    if (!fund) return null;

    const cases = fund.cases || [];

    return {
      id: fund.id,
      number: createFundNumberLabel(fund.id),
      title: fund.title,
      numberOfDescriptions: fund.numberOfDescriptions ?? 0,
      numberOfCases: fund.numberOfCases ?? 0,
      organizationForm: normalizeLocalizedString(fund.organizationForm),
      documentCreationDate: fund.documentCreationDate ?? '',
      chronologicalBoundaries: fund.chronologicalBoundaries,
      documentLanguages: fund.documentLanguages,
      characterAndContent: normalizeLocalizedTipTapDoc(fund.characterAndContent),
      accessConditions: fund.accessConditions,
      compilerInfo: fund.compilerInfo,
      status: fund.status,
      cases: cases
        .sort((a, b) => getCaseOrder(a) - getCaseOrder(b))
        .map((caseItem): CaseDTO => mapCaseToDTO(fund.id, caseItem))
    };
  },

  async getCaseById(caseId: string): Promise<CaseDetailsDTO | null> {
    await dbConnect();

    const caseDoc = await Case.findById(caseId).populate('documents').lean<CaseWithDocuments>();

    if (caseDoc?.status !== FundStatus.Published) return null;

    const fund = await Fund.findOne({ _id: caseDoc.fundId, status: FundStatus.Published }).lean<IFund>();

    if (!fund) return null;

    const fundNumber = fund.id;
    const hasStructuredOrder = typeof caseDoc.descriptionNumber === 'number' && typeof caseDoc.caseNumber === 'number';

    const prevCaseQuery = hasStructuredOrder
      ? {
          fundId: caseDoc.fundId,
          status: FundStatus.Published,
          $or: [
            { descriptionNumber: { $lt: caseDoc.descriptionNumber } },
            { descriptionNumber: caseDoc.descriptionNumber, caseNumber: { $lt: caseDoc.caseNumber } }
          ]
        }
      : {
          fundId: caseDoc.fundId,
          status: FundStatus.Published,
          order: { $lt: getCaseOrder(caseDoc) }
        };

    const nextCaseQuery = hasStructuredOrder
      ? {
          fundId: caseDoc.fundId,
          status: FundStatus.Published,
          $or: [
            { descriptionNumber: { $gt: caseDoc.descriptionNumber } },
            { descriptionNumber: caseDoc.descriptionNumber, caseNumber: { $gt: caseDoc.caseNumber } }
          ]
        }
      : {
          fundId: caseDoc.fundId,
          status: FundStatus.Published,
          order: { $gt: getCaseOrder(caseDoc) }
        };

    const prevCaseSort: Record<string, 1 | -1> = hasStructuredOrder
      ? { descriptionNumber: -1, caseNumber: -1 }
      : { order: -1 };
    const nextCaseSort: Record<string, 1 | -1> = hasStructuredOrder
      ? { descriptionNumber: 1, caseNumber: 1 }
      : { order: 1 };

    const prevCase = await Case.findOne(prevCaseQuery)
      .sort(prevCaseSort)
      .select({ _id: 1, name: 1, cipher: 1, caseName: 1, descriptionNumber: 1, caseNumber: 1, order: 1 })
      .lean<AdjacentCase>();

    const nextCase = await Case.findOne(nextCaseQuery)
      .sort(nextCaseSort)
      .select({ _id: 1, name: 1, cipher: 1, caseName: 1, descriptionNumber: 1, caseNumber: 1, order: 1 })
      .lean<AdjacentCase>();

    const documents = caseDoc.documents || [];

    return {
      _id: toObjectIdString(caseDoc._id),
      cipher: formatCipher(fundNumber, caseDoc),
      name: getLocalizedUk(caseDoc.caseName ?? caseDoc.name),
      dates: getLocalizedUk(caseDoc.caseDate ?? caseDoc.dates),
      sheets: caseDoc.sheetsNumber ?? caseDoc.sheets ?? null,
      contentDescription: getLocalizedUk(caseDoc.caseDescriptions ?? caseDoc.contentDescription),
      pdfUrl: caseDoc.pdfFile?.url ?? caseDoc.pdfUrl ?? null,
      fundId: toObjectIdString(caseDoc.fundId),
      fundNumber: createFundNumberLabel(fund.id),
      fundTitle: fund.title,
      documents: documents
        .sort((a, b) => a.order - b.order)
        .map(
          (d): DocumentDTO => ({
            _id: d._id.toString(),
            order: d.order,
            text: d.text
          })
        ),
      prevCase: buildAdjacentCase(fundNumber, prevCase),
      nextCase: buildAdjacentCase(fundNumber, nextCase)
    };
  }
};

function newFundsRepository(): typeof fundsRepository {
  return fundsRepository;
}

export default newFundsRepository;
