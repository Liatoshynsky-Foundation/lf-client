import { ObjectId } from 'mongoose';

export type ScientificWorkDb = {
  _id: ObjectId;
  title: { uk: string; en: string };
  authors: Array<{
    _id: ObjectId;
    name: { uk: string; en: string };
    surname: { uk: string; en: string };
  }>;
  startYear: number;
  endYear: number | null;
  url: string | null;
  isPreview: boolean;
};

export type AuthorDb = {
  _id: string;
  name: { uk: string; en: string };
  surname: { uk: string; en: string };
};

export type ScientificWorkTitleDb = {
  _id: string;
  title: { uk: string; en: string };
};
