import { z } from 'zod';

import { IGenreDocument } from './genre.types';
import { IOpusDocument } from './opus.types';

import { zCompositionDTOSchema } from '~/validators/artistry/composition.schema';

interface ISheetMusicItem {
  url: string;
  dateUploaded: Date;
  isFree: boolean;
}

export interface ICompositionDocument {
  _id: string;
  opusId?: IOpusDocument;
  title: string;
  year: number;
  genres?: IGenreDocument[];
  audioAvailable: boolean;
  sheetAvailable: boolean;
  sheetMusic: ISheetMusicItem[];
  createdAt: Date;
  updatedAt: Date;
}

export type ICompositionDTO = z.infer<typeof zCompositionDTOSchema>;
