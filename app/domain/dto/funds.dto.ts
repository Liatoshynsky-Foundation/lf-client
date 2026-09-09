import type { LocalizedString } from '~/types/types/common.types';
import type { LocalizedTipTapDoc } from '~/types/types/tiptap.types';

export enum FundStatus {
  Draft = 'draft',
  Published = 'published',
  Hidden = 'hidden',
  Archived = 'archived',
  Editing = 'editing'
}

export type FundBaseDTO = {
  id: number;
  number: LocalizedString;
  title: LocalizedString;
  status: FundStatus;
};

export type FundDetailsDTO = FundBaseDTO & {
  numberOfDescriptions: number;
  numberOfCases: number;
  organizationForm?: LocalizedString;
  documentCreationDate: string;
  chronologicalBoundaries?: string;
  documentLanguages?: string;
  characterAndContent?: LocalizedTipTapDoc;
  accessConditions?: string;
  compilerInfo?: string;
  cases: CaseDTO[];
};

export type CaseBaseDTO<Name = string, Dates = string, ContentDescription = string> = {
  _id: string;
  cipher: string;
  name: Name;
  dates: Dates;
  sheets: number | null;
  contentDescription: ContentDescription;
  pdfUrl: string | null;
};

export type CaseDTO = CaseBaseDTO<LocalizedString, LocalizedString, LocalizedString> & {
  order: number;
  status: FundStatus;
};

export type AdjacentCaseDTO = Pick<CaseBaseDTO, '_id' | 'name' | 'cipher'>;

export type CaseDetailsDTO = CaseBaseDTO & {
  fundId: string;
  fundNumber: LocalizedString;
  fundTitle: LocalizedString;
  documents?: DocumentDTO[];
  prevCase?: AdjacentCaseDTO | null;
  nextCase?: AdjacentCaseDTO | null;
};

export type DocumentDTO = {
  _id: string;
  order: number;
  text: string;
};
