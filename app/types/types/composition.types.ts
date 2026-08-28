export type MusicSheet = {
  url: string;
  dateUploaded: string;
  isFree: boolean;
};

export type AdditionalMenu = {
  url: string;
  key: string;
  isAvailable: boolean;
};

export type TitleOption = {
  _id: string;
  title: string | { en?: string; uk?: string };
  type?: 'composition' | 'opus' | 'genre';
  opusContext?: {
    _id: string;
    number: number;
    numberKind: string;
    additionalText?: string | null;
  };
};

export type Opus = {
  id: string;
  number: string;
  title: {
    uk: string;
    en: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type Composition = {
  id: string;
  title: string;
  year?: number | null;
  audioAvailable: boolean;
  sheetAvailable: boolean;
  songBlobUrl: string;
  sheetMusic: MusicSheet[];
  additionalMenu: {
    listenComposition: AdditionalMenu;
    viewYoutube: AdditionalMenu;
    share: AdditionalMenu;
    viewDetails: AdditionalMenu;
  };
  createdAt: string;
  updatedAt: string;
  opus?: Opus;
  genre?: string[];
};
