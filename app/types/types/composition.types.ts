export type MusicSheet = {
  url: string;
  name: string;
  publishDate: string;
  isFree: boolean;
  dateUploaded: Date;
};

export type AdditionalMenu = {
  url: string;
  key: string;
  isAvailable: boolean;
};

export type TitleOption = {
  _id: string;
  name: string;
  type?: 'composition' | 'opus' | 'genre';
};
