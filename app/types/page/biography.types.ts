import { JSONContent } from '@tiptap/react';

import type { TipTapDoc } from '../types/tiptap.types';

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

interface ChronologyListItem {
  description: TipTapDoc;
}
interface BaseImage {
  src: string;
  alt: JSONContent | string;
  caption: JSONContent | string | null;
}

interface AdvancedImage extends BaseImage {
  size: ImagesSizes;
  rectangleTopLeftCorner?: boolean;
}
interface BaseQuoteBlock {
  text: string;
  source: string;
}

interface BaseExpertBlock {
  text: string;
  source: string;
}
export interface BiographyContentItemBaseProps<T extends ContentType = ContentType> {
  type: T;
}
export interface ChronologyList extends BiographyContentItemBaseProps<ContentType.ChronologyList> {
  listItems: ChronologyListItem[];
  additionalImage?: AdvancedImage;
}
export interface ExcerptBlockItem extends BiographyContentItemBaseProps<ContentType.ExcerptBlockItem> {
  quote: BaseExpertBlock;
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
  yearTitle: string | null;
  items: BiographyContentItem[];
}

export interface BiographyContentProps {
  data: BiographyContentBlock[];
}

interface HeroImageCaption {
  mainText: string;
  yearText: string;
}
interface HeroImage {
  src: string;
  alt: string;
  caption: HeroImageCaption;
}
export interface HeroSectionBlock {
  quote: BaseQuoteBlock;
  image: HeroImage;
  biographyText: TipTapDoc;
  noteText: string;
}

export interface HeroSectionProps {
  data: HeroSectionBlock;
  years: string[];
}
