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
      <b>Ласкаво просимо на сайт Фундації Лятошинського!</b> Ми досліджуємо, зберігаємо та представляємо спадщину Бориса
      Лятошинського (1895–1968) — одного з найвизначніших українських композиторів ХХ століття, творчість і педагогічна
      діяльність якого вплинули на розвиток української класичної музики та зберігають своє значення до сьогодні.
    </>
  ),
  en: (
    <>
      <b>Welcome to the Liatoshynsky Foundation website!</b> We research, preserve, and present the legacy of Borys
      Liatoshynsky (1895–1968), one of the most significant Ukrainian composers of the twentieth century, whose music
      and teaching shaped the development of Ukrainian art music and remain influential today.
    </>
  )
};

export const foundationParagraph2: LocalizedNode = {
  uk: 'Ми сприяємо виконанню та виданню творів Лятошинського, працюємо з архівом композитора, створюємо дослідницькі й освітні проєкти. Спадщина Лятошинського відкриває ширшу історію української музики та дає змогу побачити її як невіддільну частину європейської культури.',
  en: 'We support the performance and publication of Liatoshynsky’s works, engage with the composer’s archive, and develop research and educational projects. Liatoshynsky’s legacy opens onto the broader history of Ukrainian music and allows us to see it as an integral part of European culture.'
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
