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
  opusId: string | OpusDTO;
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

export type OpusCompositionDTO = {
  _id: string;
  index: number;
  title: string;
  sheetMusicUrl?: string;
};

export type OpusVideoDTO = {
  _id: string;
  youTubeId: string;
  title?: string;
};

export type OpusDetailsDTO = {
  _id: string;
  number: string;
  title: string;
  creationDate?: string;
  genre?: string;
  movements?: string[];
  sheetMusicUrl?: string;
  description?: string | null;
  compositions: OpusCompositionDTO[];
  videos: OpusVideoDTO[];
};
export type Condition = {
  $or?: Array<
    | { 'title.uk'?: { $regex?: RegExp | string; $options?: string } }
    | { 'title.en'?: { $regex?: RegExp | string; $options?: string } }
    | { opusId?: { $in: unknown[] } }
  >;
  categories?: { $in?: Array<string | number | Record<string, unknown>> };
  genres?: { $in?: Array<string | number | Record<string, unknown>> };
  year?: { $gte: number; $lte: number };
  opusId?: { $exists?: boolean; $ne?: null; $in?: unknown[] };
};

export type Query = Condition | { $and: Condition[] } | Record<string, unknown>;
