import { Locale } from 'next-intl';

import { FundSummaryHeaderData } from './FundSummaryHeader';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

import { getNavigationLink } from '~/lib/utils/navigationHelper';
import { ROUTES } from '~/shared/components/constants/routes';

function createDescriptionText(ukText: string, enText: string): unknown {
  return {
    uk: {
      type: TipTapNodeTypes.doc,
      content: [
        {
          type: TipTapNodeTypes.paragraph,
          content: [
            {
              type: TipTapNodeTypes.text,
              text: ukText,
              marks: [{ type: 'bold' }]
            }
          ]
        }
      ]
    },
    en: {
      type: TipTapNodeTypes.doc,
      content: [
        {
          type: TipTapNodeTypes.paragraph,
          content: [
            {
              type: TipTapNodeTypes.text,
              text: enText,
              marks: [{ type: 'bold' }]
            }
          ]
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
  return await getNavigationLink(ROUTES.ARCHIVE, 'archive');
}

export const fundSummaryBacklinkText: Record<Locale, string> = {
  uk: 'Повернутись до архіву',
  en: 'Back to archive'
};

export const fundSummaryTitle: Record<Locale, string> = {
  uk: 'Фонд 2. Особисті документи',
  en: 'Fund 2. Personal Documents'
};

export const fundSummaryContent = {
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
} as unknown as FundSummaryHeaderData;
