import { Locale } from 'next-intl';

import {
  FoundationFoundersProps,
  FoundationInfoProps,
  IntroSectionProps,
  LiatoshynskyOfficeProps,
  OurGoalsProps,
  OurMissionProps,
  WhatWeDoProps
} from '~/types/pages/home/homePage';

import { AnyBlock } from '~/validators/page/blocks/anyBlock.schema';

export const transformIntroSection = (block: AnyBlock, locale: Locale): IntroSectionProps => {
  if (block.blockType !== 'ContentConstructorBlock') return { title: '', image: null, quote: null };

  const { elements } = block.content;
  const headingEl = elements.find((e) => e.elementType === 'Heading');
  const imageEl = elements.find((e) => e.elementType === 'Image');
  const quoteEl = elements.find((e) => e.elementType === 'Quote');
  let image = null;
  if (imageEl) {
    image = {
      src: `/api/blob-url?folderName=photos&blobName=${imageEl.imageName}`,
      alt: imageEl.caption?.[locale] ?? '',
      caption: imageEl.caption?.[locale] ?? ''
    };
  }
  return {
    title: headingEl?.text[locale] ?? '',
    image: image,
    quote: quoteEl ? { mainText: quoteEl.text[locale] ?? '', sourceTitle: quoteEl.author[locale] ?? '' } : null
  };
};

export const transformFoundationInfo = (block: AnyBlock, locale: Locale): FoundationInfoProps => {
  const defaultProps = {
    organisationBoldText: '',
    organisationMainText: '',
    mainText: '',
    textImage: '',
    foundationImage: null
  };
  if (block.blockType !== 'ContentConstructorBlock') return defaultProps;

  const { elements } = block.content;
  const paragraphs = elements.filter((el) => el.elementType === 'Paragraph').map((p) => p.text?.[locale] ?? '');
  const imageElement = elements.find((el) => el.elementType === 'Image');
  let foundationImage = null;
  if (imageElement) {
    foundationImage = {
      src: `/api/blob-url?folderName=photos&blobName=${imageElement.imageName}`,
      alt: imageElement.caption?.[locale] ?? ''
    };
  }
  return {
    organisationBoldText: paragraphs[0] ?? '',
    organisationMainText: paragraphs[1] ?? '',
    mainText: paragraphs[2] ?? '',
    textImage: paragraphs[3] ?? '',
    foundationImage: foundationImage
  };
};

export const transformOurMission = (block: AnyBlock, locale: Locale): OurMissionProps => {
  const defaultProps = { title: '', listItems: [], smallImage: null, bigImage: null };
  if (block.blockType !== 'ContentConstructorBlock') return defaultProps;

  const { elements } = block.content;
  const headingElement = elements.find((el) => el.elementType === 'Heading');
  const listElement = elements.find((el) => el.elementType === 'BulletedList');
  const imageElements = elements.filter((el) => el.elementType === 'Image');

  const smallImage = imageElements[0];
  const bigImage = imageElements[1];

  let transformSmallImage = null;
  if (smallImage) {
    transformSmallImage = {
      src: `/api/blob-url?folderName=photos&blobName=${smallImage.imageName}`,
      alt: smallImage.caption?.[locale] ?? '',
      caption: smallImage.caption?.[locale] ?? ''
    };
  }
  let transformbigImage = null;
  if (bigImage) {
    transformbigImage = {
      src: `/api/blob-url?folderName=photos&blobName=${bigImage.imageName}`,
      alt: bigImage.caption?.[locale] ?? '',
      caption: bigImage.caption?.[locale] ?? ''
    };
  }
  return {
    title: headingElement?.text[locale] ?? '',
    listItems: listElement?.items.map((item) => item[locale]) ?? [],
    smallImage: transformSmallImage,
    bigImage: transformbigImage
  };
};

export const transformOurGoals = (block: AnyBlock, locale: Locale): OurGoalsProps => {
  if (block.blockType !== 'ContentConstructorBlock') return { mainTitle: '', goals: [] };

  const { elements } = block.content;
  const mainTitleElement = elements.find((el) => el.elementType === 'Heading');
  const listElement = elements.find((el) => el.elementType === 'TitledList');

  return {
    mainTitle: mainTitleElement?.text[locale] ?? '',
    goals:
      listElement?.items.map((item) => ({
        id: item.title[locale],
        title: item.title[locale],
        description: item.description[locale]
      })) ?? []
  };
};

export const transformWhatWeDo = (block: AnyBlock, locale: Locale): WhatWeDoProps => {
  if (block.blockType !== 'ContentConstructorBlock') return { mainTitle: '', items: [] };

  const { elements } = block.content;
  const mainTitleElement = elements.find((el) => el.elementType === 'Heading');
  const listElement = elements.find((el) => el.elementType === 'TitledList');

  return {
    mainTitle: mainTitleElement?.text[locale] ?? '',
    items:
      listElement?.items.map((item) => ({
        id: item.title[locale],
        title: item.title[locale],
        description: item.description[locale]
      })) ?? []
  };
};

export const transformLiatoshynskyOffice = (block: AnyBlock, locale: Locale): LiatoshynskyOfficeProps => {
  if (block.blockType !== 'ContentConstructorBlock') return { quote: null };

  const quoteElement = block.content.elements.find((el) => el.elementType === 'Quote');

  return {
    quote: quoteElement ? { text: quoteElement.text[locale] ?? '', author: quoteElement.author[locale] ?? '' } : null
  };
};

export const transformFoundationFounders = (block: AnyBlock, locale: Locale): FoundationFoundersProps => {
  const defaultProps = { title: '', description: '', members: [] };
  if (block.blockType !== 'TeamBlock') return defaultProps;

  const { introText, sectionTitle, members } = block.content;

  return {
    title: sectionTitle[locale] ?? '',
    description: introText[locale] ?? '',
    members: members.map((member) => ({
      name: member.name[locale] ?? '',
      description: member.description[locale] ?? '',
      photo: `/api/blob-url?blobName=${member.imageName}&folderName=photos`
    }))
  };
};
