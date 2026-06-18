import React from 'react';

import { ROUTES } from '~/shared/components/constants/routes';
import { IMAGES } from '~/shared/constants/assets';

type Localized<T> = {
  uk: T;
  en: T;
};

type LocalizedNode = Localized<React.ReactNode>;
type LocalizedString = Localized<string>;

export const foundationParagraph1: LocalizedNode = {
  uk: (
    <>
      <b>Ласкаво просимо до Фундації Лятошинського!</b> Ми досліджуємо й популяризуємо українську класичну та сучасну
      музику в Україні й світі. Особливу увагу приділяємо спадщині Бориса Лятошинського (1895-1968) — одного з{' '}
      <b>найвпливовіших українських композиторів ХХ століття</b>, фундатора власної композиторської школи. Його твори
      поєднують у собі модерністські новації та романтичну виразність, що приваблює широке коло слухачів.
    </>
  ),
  en: (
    <>
      <b>Welcome to the Lyatoshynsky Foundation!</b> We research and promote Ukrainian classical and contemporary music
      in Ukraine and worldwide. We pay special attention to the legacy of Borys Lyatoshynsky (1895-1968) — one of the{' '}
      <b>most influential Ukrainian composers of the 20th century</b>, founder of his own compositional school. His
      works combine modernist innovations and romantic expressiveness, attracting a wide audience.
    </>
  )
};

export const foundationParagraph2: LocalizedNode = {
  uk: 'Ми зберігаємо, переосмислюємо й інтегруємо його музику у світовий контекст. Фундація працює, аби зробити українську музику доступною та впізнаваною у світі, адже вона варта міжнародного визнання.',
  en: 'We preserve, reinterpret, and integrate his music into the global context. The Foundation works to make Ukrainian music accessible and recognizable worldwide, as it deserves international recognition.'
};

export const foundationButtonText: LocalizedString = {
  uk: 'Більше про фундацію',
  en: 'More about the foundation'
};

export const foundationSectionData = {
  imageSrc: IMAGES.MAIN_FOUNDATION_SECTION,
  buttonLink: ROUTES.ABOUT_US,
  caption: ''
};
