import { PaymentMethod } from '~/components/blocks/volunteer-donation/VolunteerDonation';

import { TipTapDoc } from '~/types/types/tiptap.types';
import { boldText, makeDoc, normalText } from '~/utils/tiptapHelpers';

import { IMAGES } from '~/shared/constants/assets';

type Localized<T> = {
  uk: T;
  en: T;
};

type LocalizedTipTapDoc = Localized<TipTapDoc>;
type LocalizedString = Localized<string>;

type LocalizedButtonItem = {
  shortText: LocalizedString;
  fullText: LocalizedString;
  link: string;
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

export const principleOfHopeButtonLink =
  'https://next.privat24.ua/payments/form/%7B%22token%22%3A%225f3f8a36-862f-4714-a6e9-90320b0e9923%22%7D';

export const principleOfHopeButtonText: LocalizedString = {
  uk: 'Підтримати фонд',
  en: 'Support the Foundation'
};

export const principleOfHopeLinks: LocalizedButtonItem[] = [
  {
    shortText: {
      uk: 'Фонд «Принцип надії»',
      en: 'The Principle of Hope'
    },
    fullText: {
      uk: 'Благодійний фонд «Принцип надії»',
      en: 'The Principle of Hope Charitable Foundation'
    },
    link: 'https://www.facebook.com/principleofhope'
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

export const yermolenkoLinks: LocalizedButtonItem[] = [
  {
    shortText: {
      uk: 'Kult: Podcast',
      en: 'Kult: Podcast'
    },
    fullText: {
      uk: 'Kult: Podcast',
      en: 'Kult: Podcast'
    },
    link: 'https://www.facebook.com/kultpodcast'
  },
  {
    shortText: {
      uk: 'В. Єрмоленка',
      en: 'V. Yermolenko'
    },
    fullText: {
      uk: 'Володимира Єрмоленка',
      en: 'Volodymyr Yermolenko'
    },
    link: 'https://www.facebook.com/volodymyr.yermolenko'
  },
  {
    shortText: {
      uk: 'Т. Огаркової',
      en: 'T. Ogarkova'
    },
    fullText: {
      uk: 'Тетяни Огаркової',
      en: 'Tetiana Ogarkova'
    },
    link: 'https://www.facebook.com/tetyana.ogarkova'
  }
];

export const carsForAFU: PaymentMethod[] = [
  {
    label: { uk: 'Карта', en: 'Card' },
    value: 'UA023052990000026009036207343'
  },
  {
    label: { uk: 'Paypal', en: 'Paypal' },
    value: 'Ukraine.resisting@gmail.com'
  }
];

export const carsForAFUData = {
  title: {
    uk: 'НА АВТІВКИ ДЛЯ ЗСУ:',
    en: 'FOR THE ARMED FORCES OF UKRAINE:'
  },
  imageSrc: IMAGES.WAR_IN_UKRAINE_VOLUNTEER_DONATION,
  caption: {
    uk: 'Володимир Єрмоленко разом з дружиною Тетяною Огарковою',
    en: 'Volodymyr Yermolenko with his wife Tetiana Ogarkova'
  }
};
