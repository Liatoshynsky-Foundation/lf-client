import { TipTapDoc } from '~/types/types/common.types';

import { boldText, makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};
export const warSupportDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'У 2014 році російська федерація розпочала жорстоку та агресивну війну проти України. Фундація Лятошинського та члени її команди '
    ),
    boldText('активно залучені'),
    normalText(
      ' у підтримку проєктів українського громадського сектору, які направлені на допомогу Силам оборони України. Пропонуємо '
    ),
    boldText('познайомитися'),
    normalText(' та '),
    boldText('підтримати'),
    normalText(' ініціативи наших друзів та партнерів.')
  ]),
  en: makeDoc([
    normalText(
      'In 2014, the Russian Federation started a brutal and aggressive war against Ukraine. The Lyatoshynsky Foundation and its team members are '
    ),
    boldText('actively involved'),
    normalText(
      ' in supporting projects of the Ukrainian civil sector aimed at helping the Defense Forces of Ukraine. We invite you to '
    ),
    boldText('get acquainted with'),
    normalText(' and '),
    boldText('support'),
    normalText(' the initiatives of our friends and partners.')
  ])
};
