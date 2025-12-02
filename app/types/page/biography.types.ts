import type { TipTapDoc } from '../types/tiptap.types';

type Locale = 'uk' | 'en';
type LocalizedTipTapDoc = Record<Locale, TipTapDoc>;

export enum ContentType {
  ChronologyList = 'chronologyList',
  ExcerptBlockItem = 'excerptBlockItem',
  OnlyImageBlock = 'OnlyImageBlock',
  FullWidthImage = 'fullWidthImage'
}

export enum ImagesSizes {
  SmallHorizontal = 'smallHorizontal',
  SmallVerticalThin = 'smallVerticalThin',
  SmallVerticalWide = 'smallVerticalWide',
  BigVertical = 'bigVertical',
  BigHorizontal = 'bigHorizontal'
}

interface ChrolologyListItem {
  description: LocalizedTipTapDoc;
}
interface BaseImage {
  src: string;
  alt: LocalizedTipTapDoc;
  caption: LocalizedTipTapDoc;
}

interface AdvancedImage extends BaseImage {
  size: ImagesSizes;
  rectangleTopLeftCorner?: boolean;
}
interface BaseQuoteBlock {
  quoteText: LocalizedTipTapDoc;
  sourceText: LocalizedTipTapDoc;
}
export interface BiographyContentItemBaseProps<T extends ContentType = ContentType> {
  type: T;
}
export interface ChronologyList extends BiographyContentItemBaseProps<ContentType.ChronologyList> {
  listItems: ChrolologyListItem[];
  additionalImage?: AdvancedImage;
}
export interface ExcerptBlockItem extends BiographyContentItemBaseProps<ContentType.ExcerptBlockItem> {
  quote: BaseQuoteBlock;
}
export interface OnlyImageBlock extends BiographyContentItemBaseProps<ContentType.OnlyImageBlock> {
  mainImage: AdvancedImage;
  additionalImage?: AdvancedImage;
}
export interface FullWidthImage extends BiographyContentItemBaseProps<ContentType.FullWidthImage> {
  image: BaseImage;
}

export type BiographyContentItem = ChronologyList | ExcerptBlockItem | OnlyImageBlock | FullWidthImage;

export interface BiographyContentBlock {
  yearTitle: string | undefined;
  items: BiographyContentItem[];
}

export interface BiographyContentProps {
  data: BiographyContentBlock[];
}

interface HeroImageCaption {
  mainText: LocalizedTipTapDoc;
  yearText: LocalizedTipTapDoc;
}
interface HeroImage {
  src: string;
  alt: LocalizedTipTapDoc;
  caption: HeroImageCaption;
}
export interface BiographyHeroData {
  quote: BaseQuoteBlock;
  image: HeroImage;
  biographyText: LocalizedTipTapDoc;
  noteText: LocalizedTipTapDoc;
}

export interface BiographyHeroProps {
  data: BiographyHeroData;
  years: string[];
}

export function tiptapToPlainText(value?: TipTapDoc): string {
  if (!value) return '';
  return value.content?.map((el) => el.content?.map((child) => child.text ?? '').join('')).join(' ') ?? '';
}
