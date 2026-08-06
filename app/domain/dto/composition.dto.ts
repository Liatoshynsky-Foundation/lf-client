export type OpusDTO = {
  _id: string;
  number: string;
  title: string;
  releaseYear?: number | string;
  creationYear?: number | string | null;
  endYear?: number | string | null;
  status?: string | null;
  genre?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type SheetMusicDTO = {
  url: string;
  dateUploaded: Date;
  isFree: boolean;
};

export type CategoryDTO = {
  _id: string;
  key: string;
  name: string;
};

export type CompositionDTO = {
  _id: string;
  title: string;
  year?: number | null;
  opusId: string | OpusDTO;
  audioAvailable: boolean;
  sheetAvailable: boolean;
  sheetMusic: SheetMusicDTO[];
  createdAt: Date;
  updatedAt: Date;
  opus: OpusDTO;
  genre?: string | null;
};

export type CompositionTitlesDTO = {
  _id: string;
  title: string;
};
export type Condition = {
  $or?: Array<
    | { 'title.uk'?: { $regex?: RegExp | string; $options?: string } }
    | { 'title.en'?: { $regex?: RegExp | string; $options?: string } }
    | { opusId?: { $in: unknown[] } }
    | { genre?: { $regex?: RegExp | string; $options?: string } }
  >;
  categories?: { $in?: Array<string | number | Record<string, unknown>> };
  year?: { $gte: number; $lte: number };
  opusId?: { $exists?: boolean; $ne?: null; $in?: unknown[] };
};

export type Query = Condition | { $and: Condition[] } | Record<string, unknown>;
