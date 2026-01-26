import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

type Localized<T> = {
  uk: T;
  en: T;
};

type LocalizedTipTapDoc = Localized<TipTapDoc>;
type LocalizedString = Localized<string>;

export const foundationParagraph1: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Ласкаво просимо до Фундації Лятошинського! Ми досліджуємо й популяризуємо українську класичну та сучасну музику в Україні й світі. Особливу увагу приділяємо спадщині Бориса Лятошинського (1895-1968) — одного з найвпливовіших українських композиторів ХХ століття, фундатора власної композиторської школи. Його твори поєднують у собі модерністські новації та романтичну виразність, що приваблює широке коло слухачів.'
    )
  ]),
  en: makeDoc([
    normalText(
      'Welcome to the Lyatoshynsky Foundation! We research and promote Ukrainian classical and contemporary music in Ukraine and worldwide. We pay special attention to the legacy of Borys Lyatoshynsky (1895-1968) — one of the most influential Ukrainian composers of the 20th century, founder of his own compositional school. His works combine modernist innovations and romantic expressiveness, attracting a wide audience.'
    )
  ])
};

export const foundationParagraph2: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Ми зберігаємо, переосмислюємо й інтегруємо його музику у світовий контекст. Фундація працює, аби зробити українську музику доступною та впізнаваною у світі, адже вона варта міжнародного визнання.'
    )
  ]),
  en: makeDoc([
    normalText(
      'We preserve, reinterpret, and integrate his music into the global context. The Foundation works to make Ukrainian music accessible and recognizable worldwide, as it deserves international recognition.'
    )
  ])
};

export const foundationButtonText: LocalizedString = {
  uk: 'Більше про фундацію',
  en: 'More about the foundation'
};

export const foundationSectionData = {
  imageSrc: '/images/foundation-section.jpg',
  buttonLink: '/about-us',
  caption: ''
};
