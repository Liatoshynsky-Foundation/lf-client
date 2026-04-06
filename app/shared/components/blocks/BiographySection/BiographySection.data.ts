import type { Locale } from 'next-intl';

import { TipTapDoc } from '~/types/types/tiptap.types';

import { boldText, makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { ROUTES } from '~/shared/components/constants/routes';

type LocalizedString = Record<Locale, string>;
type LocalizedTipTapDoc = Record<Locale, TipTapDoc>;

export const title: LocalizedString = {
  uk: 'ХтО віН, БоРис ЛяТошиНськИй?',
  en: 'Who Was Borys Liatoshynsky?'
};

export const spanText: LocalizedString = {
  uk: 'Його історія — не лише дати й твори, а рішення в контексті епохи',
  en: 'His story is not only dates and works, but decisions shaped by the context of the era'
};

export const ctaLabel: LocalizedString = {
  uk: 'Переглянути життєпис',
  en: 'View Biography'
};

export const ctaHref = ROUTES.BIOGRAPHY;

export const text: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Чому Лятошинський став одним із '),
    boldText('найвпливовіших українських композиторів ХХ століття'),
    normalText(
      '? Як розгорталося його життя?  Кожна мистецька біографія складається з фактів: особистісних, творчих, історичних. Вони розказують нам про долю композитора, його рішення і вчинки. Тут ви знайдете документовану біографію Бориса Лятошинського, наповнену як радісними, так і трагічними подіями.'
    )
  ]),
  en: makeDoc([
    normalText('Why did Liatoshynsky become one of '),
    boldText('the most influential Ukrainian composers of the 20th century'),
    normalText(
      '? How did his life unfold? Every artistic biography is shaped by personal, creative, and historical facts. They tell us about the composer’s fate, his decisions, and his actions. Here you will find a documented biography of Borys Liatoshynsky, filled with both joyful and tragic events.'
    )
  ])
};
