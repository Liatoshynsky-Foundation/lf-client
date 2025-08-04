export type MusicSheet = {
  url: string;
  dateUploaded: Date;
  isFree: boolean;
};

export type AdditionalMenu = {
  url: string;
  key: string;
  isAvailable: boolean;
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

export type Genre = {
  id: string;
  key: string;
  name: {
    uk: string;
    en: string;
  };
};

export type Composition = {
  id: string;
  title: string;
  year: number;
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
  genres: Genre[];
};
