import { TipTapDoc } from '~/types/types/tiptap.types';

import { boldText, makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

type Locale = 'uk' | 'en';
type LocalizedString = Record<Locale, string>;
type LocalizedTipTapDoc = Record<Locale, TipTapDoc>;

export const heroTexts = {
  quoteText: {
    uk: `..мене завжди цікавило і цікавить минуле людства. Цілі епохи, колись сповнені руху і життя, сповнені подій і думок людства,
    відійшли в минуле, залишивши тільки пам'ятки свого життя і діяльності. Століття... Тисячоліття...`,
    en: `..I have always been deeply interested in the past of humankind. Whole eras, once full of movement and life, filled with events and human thought,
    have receded into the past, leaving only the traces of their life and work. Centuries... Millennia...`
  } satisfies LocalizedString,

  sourceText: {
    uk: 'З листа Бориса Лятошинського до Валерія Польового від 23 січня 1965 року',
    en: 'From a letter by Borys Lyatoshynsky to Valeriy Polyovyi, 23 January 1965'
  } satisfies LocalizedString,

  image: {
    src: '/images/liatoshynsky-hero-section.png',
    alt: {
      uk: 'Борис Лятошинський з котами на дачі в Ворзелі',
      en: 'Borys Lyatoshynsky with cats at his dacha in Vorzel'
    } satisfies LocalizedString
  },

  imageCaption: {
    mainText: {
      uk: 'Борис Лятошинський з котами на дачі в Ворзелі.',
      en: 'Borys Lyatoshynsky with cats at his dacha in Vorzel.'
    } satisfies LocalizedString,
    yearText: {
      uk: '1960-ті роки',
      en: '1960s'
    } satisfies LocalizedString
  }
} as const;

export const heroBiographyDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Борис Лятошинський є одним із '),
    boldText('провідних українських композиторів ХХ століття.'),
    normalText(
      ' Більша частина написаних ним творів уже мають статус класичних. ' +
        'Сформована Лятошинським композиторська школа є найвпливовішою в Україні ' +
        'в другій половині минулого і нашому сторіччі.'
    )
  ]),
  en: makeDoc([
    normalText('Borys Lyatoshynsky is one of '),
    boldText('the leading Ukrainian composers of the 20th century.'),
    normalText(
      ' The majority of his works have already attained the status of classics. ' +
        'The compositional school formed by Lyatoshynsky is the most influential in Ukraine ' +
        'in the second half of the last century and in our own.'
    )
  ])
};

export const heroNoteDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      '*Життєпис створено на основі документів, що зберігаються у приватному архіві Кабінету-музею Бориса Лятошинського; ' +
        'особовій справі Бориса Лятошинського, що велася в Київській консерваторії ' +
        'від 28 лютого 1945 року до 25 квітня 1968 року (ДАмК. Фонд Р-810, опис 2, № 184); ' +
        'ЦДАВО України. Фонд 166, опис 12 ос, справа 4539.'
    )
  ]),
  en: makeDoc([
    normalText(
      '*This life story has been compiled on the basis of documents preserved in the private archive of the Borys Lyatoshynsky Memorial Studio-Museum; ' +
        'the personal file of Borys Lyatoshynsky kept at the Kyiv Conservatory ' +
        'from 28 February 1945 to 25 April 1968 (DAMK. Collection R-810, inventory 2, no. 184); ' +
        'and the Central State Archive of Supreme Bodies of Power and Government of Ukraine (TsDAVO). ' +
        'Collection 166, inventory 12 os, file 4539.'
    )
  ])
};
