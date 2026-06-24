import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { ROUTES } from '~/shared/components/constants/routes';
import { IMAGES } from '~/shared/constants/assets';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const eventsTitle = {
  uk: 'ПоДіЇ Та ЗаХоДи',
  en: 'EvEnTs AnD AcTiViTiEs'
};

export const eventsMainText: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Що відбувається у світі класичної музики? Де й коли виконуються твори українських композиторів? Чи можна почути музику Лятошинського на концертах? Які події від наших друзів і партнерів варто відвідати? Ми відстежуємо актуальні події, рекомендуємо найцікавіше й спрямовуємо до найважливіших музичних (і не тільки!) заходів в Україні та світі.'
    )
  ]),
  en: makeDoc([
    normalText(
      'What is happening in the world of classical music? Where and when are the works of Ukrainian composers performed? Is it possible to hear Lyatoshynsky’s music at concerts? We track current events, recommend the most interesting ones, and guide you to the most important musical events in Ukraine and the world.'
    )
  ])
};

export const eventsPublishDateLabel = {
  uk: 'Опубліковано',
  en: 'Published'
};

export const eventsViewLabel = {
  uk: 'Переглянути',
  en: 'View'
};

export const eventsRegLabel = {
  uk: 'Реєстрація',
  en: 'Registration'
};

export const eventsCtaLabel = {
  uk: 'Переглянути усі події',
  en: 'View all events'
};

export const eventsPrevLabel = {
  uk: 'Попередня подія',
  en: 'Previous event'
};

export const eventsNextLabel = {
  uk: 'Наступна подія',
  en: 'Next event'
};

const COMMON_TITLE = {
  uk: 'У КИЄВІ СТАРТУЄ ФЕСТИВАЛЬ МУЗИКИ БОРИСА ЛЯТОШИНСЬКОГО. ЧОМУ ВАРТО ВІДВІДАТИ',
  en: 'BORYS LYATOSHYNSKY MUSIC FESTIVAL STARTS IN KYIV. WHY IT’S WORTH VISITING'
};

const COMMON_DESC = {
  uk: 'Прийдешнього 2025 року відзначатиметься 130-річчя від дня народження Бориса Лятошинського (1895–1968). Звісно, ця постать в українській культурі є настільки м...',
  en: 'The upcoming year 2025 will mark the 130th anniversary of the birth of Borys Lyatoshynsky (1895–1968). Of course, this figure in Ukrainian culture is so s...'
};

export const mockEventsData = {
  ctaHref: ROUTES.NEWS,
  events: [
    {
      id: '1',
      date: {
        uk: '29.02 - 02.03.2024',
        en: '29.02 - 02.03.2024'
      },
      title: COMMON_TITLE,
      description: COMMON_DESC,
      image: IMAGES.MAIN_EVENT_SECTION(1),
      publishDate: {
        uk: '05.05.25',
        en: '05.05.25'
      },
      regLink: '#'
    },
    {
      id: '2',
      date: {
        uk: '15.10 - 16.10.2024',
        en: '15.10 - 16.10.2024'
      },
      title: {
        uk: '«ЗОЛОТИЙ ОБРУЧ»: МАЙЖЕ ДЕТЕКТИВНА ІСТОРІЯ',
        en: '“THE GOLDEN HOOP”: ALMOST A DETECTIVE STORY'
      },
      description: {
        uk: 'З чого розпочинається підготовка до виконання будь-якого музичного твору? Відповідь є простою до банальності – треба взяти ноти. Однак, часто у випадках з творами українських композиторів ця банальність перетворюється в справжнє дет...',
        en: 'Where does the preparation for the performance of any musical work begin? The answer is simple to the point of banality – you need to get the sheet music. However, in cases with works by Ukrainian composers, this banality often turns into a real det...'
      },
      image: IMAGES.MAIN_EVENT_SECTION(2),
      publishDate: {
        uk: '06.05.25',
        en: '06.05.25'
      },
      regLink: undefined
    },
    {
      id: '3',
      date: {
        uk: '29.09 - 30.09.2024',
        en: '29.09 - 30.09.2024'
      },
      title: COMMON_TITLE,
      description: COMMON_DESC,
      image: IMAGES.MAIN_EVENT_SECTION(3),
      publishDate: {
        uk: '05.05.25',
        en: '05.05.25'
      },
      regLink: '#'
    },
    {
      id: '4',
      date: {
        uk: '29.09 - 30.09.2024',
        en: '29.09 - 30.09.2024'
      },
      title: COMMON_TITLE,
      description: COMMON_DESC,
      image: IMAGES.MAIN_EVENT_SECTION(1),
      publishDate: {
        uk: '05.05.25',
        en: '05.05.25'
      },
      regLink: '#'
    }
  ]
};
