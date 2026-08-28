import { LocalizedString } from '~/types/types/common.types';

export interface CompositionItemDTO {
  _id: string;
  name: LocalizedString;
  year?: number | null;
  genre?: string | null;
  audioAvailable: boolean;
  sheetAvailable: boolean;
  sheetMusic: SheetMusicDTO[] | null;
  audios: SheetMusicDTO[] | null;
}

export interface OpusGroupDTO {
  _id: string;
  number: number;
  numberKind: string;
  title: LocalizedString;
  name: LocalizedString;
  additionalText?: string | null;
  creationYear: string;
  endYear?: string | null;
  genre?: LocalizedString | null;
  status: string;
  compositions: CompositionItemDTO[];
}

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
    | { genre?: { $regex?: RegExp | string; $options?: string } }
  >;
  categories?: { $in?: Array<string | number | Record<string, unknown>> };
  year?: { $gte: number; $lte: number };
  opusId?: { $exists?: boolean; $ne?: null; $in?: unknown[] };
};

export type Query = Condition | { $and: Condition[] } | Record<string, unknown>;
