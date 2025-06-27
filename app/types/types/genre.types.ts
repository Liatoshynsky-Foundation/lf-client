import { ITranslatedField } from '~/types/types/translation';

export interface IGenreDocument {
  _id: string;
  key: string;
  name: ITranslatedField;
}
