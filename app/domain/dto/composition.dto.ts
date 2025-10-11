export type OpusDTO = {
  _id: string;
  number: number;
  title: string;
  releaseYear?: number;
  createdAt: Date;
  updatedAt: Date;
};

type SheetMusicDTO = {
  url: string;
  dateUploaded: Date;
  isFree: boolean;
};

export type GenreDTO = {
  _id: string;
  key: string;
  name: string;
};

export type CategoryDTO = {
  _id: string;
  key: string;
  name: string;
};

export type CompositionDTO = {
  _id: string;
  title: string;
  year: number;
  audioAvailable: boolean;
  sheetAvailable: boolean;
  sheetMusic: SheetMusicDTO[];
  createdAt: Date;
  updatedAt: Date;
  opus: OpusDTO;
  genres: GenreDTO;
};
export type CompositionTitlesDTO = {
  _id: string;
  title: string;
};
export type Condition = {
  $or?: Array<
    | { 'title.uk'?: { $regex?: RegExp | string; $options?: string } }
    | { 'title.en'?: { $regex?: RegExp | string; $options?: string } }
  >;
  genres?: { $in?: Array<string | number | Record<string, unknown>> };
  year?: { $gte: number; $lte: number };
};

export type Query = Condition | { $and: Condition[] } | Record<string, unknown>;
