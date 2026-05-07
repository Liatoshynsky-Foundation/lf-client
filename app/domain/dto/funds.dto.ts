export type FundDTO = {
  id: number;
  number: { en: string; uk: string };
  title: { en: string; uk: string };
};

export type FundDetailsDTO = {
  id: number;
  number: { en: string; uk: string };
  title: { en: string; uk: string };
  numberOfDescriptions: number;
  numberOfCases: number;
  organizationForm: string;
  documentCreationDate: string;
  chronologicalBoundaries: string;
  documentLanguages: string;
  characterAndContent: string;
  accessConditions: string;
  compilerInfo: string;
  cases?: CaseDTO[];
};

export type CaseDTO = {
  _id: string;
  cipher: string;
  name: string;
  dates: string;
  sheets: number | null;
  contentDescription: string;
  pdfUrl: string | null;
  order: number;
};

export type CaseDetailsDTO = {
  _id: string;
  cipher: string;
  name: string;
  dates: string;
  sheets: number | null;
  contentDescription: string;
  pdfUrl: string | null;
  fundId: string;
  fundNumber: { en: string; uk: string };
  fundTitle: { en: string; uk: string };
  documents?: DocumentDTO[];
  prevCase?: { _id: string; name: string; cipher: string } | null;
  nextCase?: { _id: string; name: string; cipher: string } | null;
};

export type DocumentDTO = {
  _id: string;
  order: number;
  text: string;
};
