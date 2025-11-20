export type AuthorDTO = {
  _id: string;
  key: string;
  name: string;
};

export type ScientificWorkDTO = {
  _id: string;
  authors: AuthorDTO[];
  title: string;
  startYear: number;
  endYear: number | null;
  url: string | null;
  isPreview: boolean;
};

export type ScientificWorkTitlesDTO = {
  _id: string;
  title: string;
};

export type Condition =
  | { $or: Record<string, any>[] }
  | { authors: { $in: string[] } }
  | { startYear: { $gte: number; $lte: number } };

export type Query = Condition | { $and?: Condition[] };
