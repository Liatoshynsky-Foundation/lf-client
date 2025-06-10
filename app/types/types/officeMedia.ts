type StyleKey = 'photo1' | 'photo2' | 'photo3';

export type ImageData = {
  src: string;
  alt: string;
  styleKey: StyleKey;
};

export type OfficeMediaProps = {
  images: ImageData[];
};
