import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const artistrySectionTextContent: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Створювати музику, працювати для Бориса Лятошинського було справою життя. Його твори вирізняються піднесеністю, красою та емоційною насиченістю. У спадщині Лятошинського кожен знайде для себе щось цікаве.\n'
    ),
    normalText('Тут зібрано записи й ноти творів композитора, а також коментарі до них.')
  ]),
  en: makeDoc([
    normalText(
      // eslint-disable-next-line quotes
      "Creating music and working for Boris Lyatoshynsky was his life's work. His compositions are distinguished by their grandeur, beauty, and emotional richness. Everyone will find something interesting in Lyatoshynsky's legacy."
    ),
    normalText(
      // eslint-disable-next-line quotes
      "This collection includes recordings and sheet music of the composer's works, as well as commentary on them."
    )
  ])
};

export const artistrySectionData = {
  subTitle: {
    uk: 'Музика Лятошинського',
    en: 'FounDatION NeWs '
  },
  textContent: artistrySectionTextContent,
  buttonText: {
    uk: 'Переглянути усі твори',
    en: 'View All Compositions'
  },
  buttonLink: '/artistry'
};
