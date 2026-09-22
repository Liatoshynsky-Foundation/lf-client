import type { Locale } from 'next-intl';

import { TipTapDoc } from '~/types/types/tiptap.types';

import { boldText, makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { ROUTES } from '~/shared/components/constants/routes';

type LocalizedString = Record<Locale, string>;
type LocalizedTipTapDoc = Record<Locale, TipTapDoc>;

export const title: LocalizedString = {
  uk: 'Хто він, Борис Лятошинський?',
  en: 'Who is Borys Liatoshynsky?'
};

export const spanText: LocalizedString = {
  uk: 'Життя і творчість Бориса Лятошинського — історія права залишатися собою у складні часи.',
  en: 'The life and work of Borys Liatoshynsky tell a story of the right to remain oneself in difficult times.'
};

export const ctaLabel: LocalizedString = {
  uk: 'Переглянути життєпис',
  en: 'View Biography'
};

export const ctaHref = ROUTES.BIOGRAPHY;

export const text: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Чому Борис Лятошинський став одним із '),
    boldText('найвизначніших українських композиторів ХХ століття?'),
    normalText(
      ' Як змінювалася його музика разом із ним самим і часом, у якому він жив?\n\nЖиття композитора неможливо відокремити від його творчості. Особисті обставини, історичні події, мистецькі пошуки, успіхи й заборони позначалися на його рішеннях і музиці. Водночас творчість Лятошинського — від ранніх модерністських експериментів до пізніх симфоній — розповідає про нього самого і про епоху, в якій він жив, не менше, ніж факти його біографії.\n\nТут ви знайдете документовану історію життя і творчості Бориса Лятошинського — його музики, виборів і часу.'
    )
  ]),
  en: makeDoc([
    normalText('Why did Borys Liatoshynsky become one of '),
    boldText('the most significant Ukrainian composers of the twentieth century?'),
    normalText(
      ' How did his music change along with him and the times in which he lived?\n\nThe composer’s life cannot be separated from his creative work. Personal circumstances, historical events, artistic exploration, successes, and restrictions all shaped his choices and his music. At the same time, Liatoshynsky’s music—from his early modernist experiments to his late symphonies—tells us as much about the composer himself and the era in which he lived as the facts of his biography do.\n\nHere you will find a documented account of Borys Liatoshynsky’s life and work—his music, his choices, and his times.'
    )
  ])
};
