type OpusDTO = {
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
