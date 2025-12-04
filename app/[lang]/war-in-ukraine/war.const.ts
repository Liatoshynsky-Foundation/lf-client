import { PaymentMethod } from '~/components/blocks/volunteer-donation/VolunteerDonation';

import { TipTapDoc } from '~/types/types/tiptap.types';
import { boldText, makeDoc, normalText } from '~/utils/tiptapHelpers';

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
    normalText(' ініціативи наших друзів та партнерів:')
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
    normalText(' the initiatives of our friends and partners:')
  ])
};

export const principleOfHopeDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    boldText('Благодійний фонд «Принцип надії»'),
    normalText(
      ' – правозахисна організація, яка працює заради суспільства, де люди живуть гідно, у взаємній повазі і без страху. Співкоординатор організації правозахисник, журналіст, '
    ),
    boldText('старший лейтенант ЗСУ Максим Буткевич'),
    normalText(
      ' понад два роки перебував у російському полоні і був звільнений у жовтні 2024 року. Серед пріоритетів «Принципу надії» — допомога військовим і цивільним, які повертаються з неволі, сприяння їхній реінтеграції, а також нагадування міжнародній спільноті про тисячі громадян і громадянок України, які досі поневолені державою-агресором.'
    )
  ]),
  en: makeDoc([
    boldText('"The Principle of Hope" Charitable Foundation'),
    normalText(
      ' – is a human rights organization working towards a society where people live with dignity, in mutual respect, and without fear. The organization’s co-coordinator, human rights activist, journalist, '
    ),
    boldText('Senior Lieutenant of the Armed Forces of Ukraine Maksym Butkevych'),
    normalText(
      ' spent over two years in Russian captivity and was released in October 2024. Among the priorities of "The Principle of Hope" is assistance to military personnel and civilians returning from captivity, facilitating their reintegration, as well as reminding the international community of the thousands of Ukrainian citizens still held captive by the aggressor state.'
    )
  ])
};

export const principleOfHopeLinks = [
  {
    shortText: 'Фонд «Принцип надії»',
    fullText: 'Благодійний фонд «Принцип надії»',
    link: 'https://www.facebook.com'
  }
];

export const yermolenkoDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Філософ, президент українського ПЕН '),
    boldText('Володимир Єрмоленко'),
    normalText(' разом з дружиною, літературознавицею '),
    boldText('Тетяною Огарковою'),
    normalText(
      ' після повномасштабного вторгнення держави-агресора 24 лютого 2022 року здійснили понад 50 подорожей деокупованими та прифронтовими територіями. В пріоритеті – автомобілі для військових, потреба в яких тільки зростає.'
    )
  ]),
  en: makeDoc([
    normalText('Philosopher and president of PEN Ukraine, '),
    boldText('Volodymyr Yermolenko'),
    normalText(', along with his wife, literary critic '),
    boldText('Tetiana Ogarkova'),
    normalText(
      ', have made over 50 trips to de-occupied and frontline territories since the full-scale invasion began on February 24, 2022. Their priority is securing vehicles for the military, the need for which only continues to grow.'
    )
  ])
};

export const yermolenkoLinks = [
  {
    shortText: 'Kult: Podcast',
    fullText: 'Kult: Podcast',
    link: 'https://www.facebook.com'
  },
  {
    shortText: 'В. Єрмоленка',
    fullText: 'Володимира Єрмоленка',
    link: 'https://www.facebook.com'
  },
  {
    shortText: 'Т. Огаркової',
    fullText: 'Тетяни Огаркової',
    link: 'https://www.facebook.com'
  }
];

export const carsForAFU: PaymentMethod[] = [
  {
    label: 'Карта',
    value: 'UA023052990000026009036207343'
  },
  {
    label: 'Paypal',
    value: 'Ukraine.resisting@gmail.com'
  }
];

export const carsForAFUData = {
  title: 'НА АВТІВКИ ДЛЯ ЗСУ:',
  imageSrc: '/images/war-in-ukraine-page/photo-1.png',
  caption: 'Володимир Єрмоленко разом з дружиною Тетяною Огарковою'
};
