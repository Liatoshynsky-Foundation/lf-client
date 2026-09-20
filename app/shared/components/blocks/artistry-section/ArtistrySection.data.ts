import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { ROUTES } from '~/shared/components/constants/routes';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const artistrySectionTextContent: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Борис Лятошинський писав музику майже все життя і працював у найрізноманітніших жанрах — створював симфонії, опери, камерні, фортепіанні та хорові твори, музику до театральних вистав і кіно. Його музика так само різноманітна за змістом і музичною мовою — від особистого й ліричного до відгуків на події свого часу.'
    ),
    normalText('Тут зібрано інформацію про твори композитора, ноти, аудіозаписи та коментарі до них.')
  ]),
  en: makeDoc([
    normalText(
      'Borys Liatoshynsky composed music throughout most of his life and worked in a remarkably wide range of genres, including symphonies, operas, chamber, piano, and choral works, as well as incidental music for the theatre and film scores. His music is equally diverse in its subject matter and musical language, ranging from the personal and lyrical to responses to the events of his time.'
    ),
    normalText(
      'Here you will find information about the composer’s works, scores, recordings, and accompanying commentary.'
    )
  ])
};

export const artistrySectionData = {
  subTitle: {
    uk: 'Музика Лятошинського',
    en: 'Liatoshynsky’s Music'
  },
  textContent: artistrySectionTextContent,
  buttonText: {
    uk: 'Переглянути усі твори',
    en: 'View All Compositions'
  },
  buttonLink: ROUTES.ARTISTRY
};
