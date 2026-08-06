import { TipTapDoc } from '~/types/types/tiptap.types';

import { boldText, makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const infoDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Будь-який фінансовий внесок у Фундацію здійснюється прозоро та відповідно до статуту нашої громадської організації. Всі отримані кошти цільово спрямовуються на реалізацію місії Фундації: розвиток української музики, збереження та популяризацію спадщини Бориса Лятошинського, а також підтримку нових мистецьких ініціатив. Таким чином, '
    ),
    boldText('кожна ваша гривня працює на спільну справу'),
    normalText(' і наближає нашу мету.')
  ]),
  en: makeDoc([
    normalText(
      // eslint-disable-next-line quotes
      `Any financial contribution made to the Foundation is executed transparently and in accordance with the charter of our public organization. All funds received are purposefully directed towards implementation of the Foundation's mission: the development of Ukrainian music, the preservation and popularization of Borys Liatoshynsky's legacy and the support of new art initiatives. Thus, `
    ),
    boldText('every hryvnia you donate works towards our common cause'),
    normalText(' and brings us closer to our goal.')
  ])
};

export const supportDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Ми розуміємо, що можливості й бажання допомоги в усіх різні. Тому '),
    boldText('формат підтримки можемо узгодити індивідуально.'),
    normalText(
      ' Це може бути як разова допомога для окремого проєкту, так і довготривале партнерство. У будь-якому випадку, ми цінуємо кожен внесок і кожну ініціативу, незалежно від масштабу чи тривалості.'
    )
  ]),
  en: makeDoc([
    normalText('We understand that everyone has different capacities and desires to help. Therefore, '),
    boldText('the format of support can be agreed upon individually.'),
    normalText(
      ' This can be either one-time donation for a specific project or a long-term partnership. In any case, we value every contribution and every initiative, regardless of its scale or duration.'
    )
  ])
};

export const partnersDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Ми з повагою та вдячністю ставимось до всіх наших партнерів і благодійників. '),
    boldText('Кожен партнер буде представлений на нашому сайті:'),
    normalText(
      '  у спеціальному блоці ми розміщуємо клікабельні логотипи партнерських організацій, щоб відвідувачі могли дізнатися більше про наших друзів. Окремо відведено блок для меценатів — людей і компаній, завдяки яким наша діяльність отримує фінансову підтримку. Імена меценатів (за їхньою згодою) ми публікуємо з глибокою вдячністю.'
    )
  ]),
  en: makeDoc([
    normalText('We treat all our partners and benefactors with respect and gratitude. '),
    boldText('Every partner will be featured on our website:'),
    normalText(
      ' we place clickable logos of partner organisations in a special section so that visitors can learn more about our friends. A separate block is reserved for patrons—individuals and companies who provide financial support for our activities. We publish the names of our patrons (with their consent) with deep gratitude.'
    )
  ])
};

export const partnershipDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Якщо Вам близькі наші цінності й бажання розвивати українську музичну спадщину, станьте нашим партнером. Ми будемо раді обговорити будь-які пропозиції. Напишіть нам на електронну пошту або скористайтеся формою на сайті, щоб розпочати діалог. Дякуємо за увагу і сподіваємося на плідну співпрацю!'
    )
  ]),
  en: makeDoc([
    normalText(
      'If you share our values and desire to develop Ukrainian musical heritage, please consider becoming our partner. We will be delighted to discuss any proposals. Write to us via email or use the contact form on our website to start a dialogue. Thank you for your interest, and we look forward to a fruitful cooperation!'
    )
  ])
};
