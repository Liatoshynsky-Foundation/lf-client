import { Locale } from 'next-intl';

import { FundSummaryHeaderData } from './FundSummaryHeader';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

import newNavigationRepository from '~/infrastructure/repositories/navigation/navigation.repository';

function createDescriptionText(ukText: string, enText: string) {
  return {
    uk: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [{ type: TipTapNodeTypes.text as const, text: ukText }]
        }
      ]
    },
    en: {
      type: TipTapNodeTypes.doc as const,
      content: [
        {
          type: TipTapNodeTypes.paragraph as const,
          content: [{ type: TipTapNodeTypes.text as const, text: enText }]
        }
      ]
    }
  };
}

function createFundItem(ukTitle: string, enTitle: string, ukDescription: string, enDescription: string) {
  return {
    title: {
      uk: ukTitle,
      en: enTitle
    },
    description: createDescriptionText(ukDescription, enDescription)
  };
}

export async function getFundSummaryHeaderBacklinkUrl(): Promise<string> {
  const navigationRepo = newNavigationRepository();
  const navigations = await navigationRepo.getNavigation();

  for (const nav of navigations) {
    const archiveLink = nav.links.find(
      (link) =>
        link.href === '/archive' ||
        link.label.uk.toLowerCase().includes('архів') ||
        link.label.en.toLowerCase().includes('archive')
    );

    if (archiveLink) {
      return archiveLink.href;
    }
  }

  return '/archive';
}

export const fundSummaryBacklinkUrl = await getFundSummaryHeaderBacklinkUrl();

export const fundSummaryBacklinkText: Record<Locale, string> = {
  uk: 'Повернутись до архіву',
  en: 'Back to archive'
};

export const fundSummaryTitle: Record<Locale, string> = {
  uk: 'Фонд 2. Особисті документи',
  en: 'Fund 2. Personal Documents'
};

export const fundSummaryContent: FundSummaryHeaderData = {
  items: [
    createFundItem('Кількість описів', 'Number of inventories', '2', '2'),
    createFundItem(
      'Мова документів',
      'Language of documents',
      'переважно російська, частково українська, польська',
      'mainly Russian, partially Ukrainian, Polish'
    ),
    createFundItem('Кількість справ', 'Number of cases', '9', '9'),
    createFundItem(
      'Характер і зміст документів',
      'Nature and content of documents',
      'Документи про освіту, трудову діяльність, нагороди, автобіографічні матеріали, військову службу, членство в організаціях, поїздки за кордон тощо.',
      'Documents about education, work activity, awards, autobiographical materials, military service, membership in organizations, trips abroad, etc.'
    ),
    createFundItem('Форма упорядкування', 'Form of arrangement', 'тематико-хронологічна', 'thematic-chronological'),
    createFundItem(
      'Умови доступу',
      'Access conditions',
      'Доступ вільний. Документи, що містять персональні дані, надаються для ознайомлення відповідно до законодавства про захист персональної інформації.',
      'Access is free. Documents containing personal data are provided for review in accordance with legislation on the protection of personal information.'
    ),
    createFundItem('Дата утворення документів', 'Date of document creation', '1895-1971', '1895-1971'),
    createFundItem(
      'Відомості про укладача',
      'Information about the compiler',
      'Ірина Тукова (07.07.2025), Олександра Чеботар',
      'Iryna Tukova (07.07.2025), Oleksandra Chebotar'
    ),
    createFundItem('Хронологічні межі', 'Chronological boundaries', '1895-1971', '1895-1971')
  ]
};
