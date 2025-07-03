import { ITranslatedField } from '~/types/types/translation';

export interface IOpusDocument {
  _id: string;
  number: string;
  releaseYear?: number;
  title: ITranslatedField;
  createdAt: Date;
  updatedAt: Date;
}
