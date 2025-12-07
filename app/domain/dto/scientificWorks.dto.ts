export type AuthorDTO = {
  _id: string;
  name: string;
  surname: string;
};

export type ScientificWorkDTO = {
  _id: string;
  title: string;
  authors: AuthorDTO[];
  startYear: number;
  endYear: number | null;
  url: string | null;
  isPreview: boolean;
};

export type ScientificWorkTitlesDTO = {
  _id: string;
  title: string;
};

export type ScientificWorkTableRow = {
  id: string;
  name: string;
  author: string;
  sortableYear: number;
  year: string;
  url: string | null;
  isPreview: boolean;
};

export type Condition =
  | { $or: Array<Record<string, unknown>> }
  | { authors: { $in: string[] } }
  | { startYear: { $gte: number; $lte: number } };

export type Query = Condition | { $and?: Condition[] };
