export type AuthorDTO = {
  _id: number;
  name: string;
  surname: string;
};

export type ScientificWorkDTO = {
  _id: number;
  authors: AuthorDTO[];
  title: string;
  startYear: number;
  endYear: number;
  url: string;
  isPreview: boolean;
};
