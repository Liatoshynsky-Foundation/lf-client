import { TipTapDoc } from '~/types/types/tiptap.types';

import { boldText, linkText, makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { ROUTES } from '~/shared/components/constants/routes';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const registerListKeys = ['downloadNotes', 'saveNotes', 'subscribeNews'] as const;
export const behaviorListKeys = ['useResponsibly', 'noSharing', 'noPublicPosting'] as const;

export const introDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    boldText('Вітаємо на сайті Фундації Лятошинського!'),
    normalText(
      ' Радіємо, що ви зацікавилися українською музикою і спадщиною Бориса Лятошинського. Цей розділ створений для того, щоб користувачі сайту – виконавці, дослідники, слухачі – '
    ),
    boldText('легко орієнтувалися'),
    normalText(' в доступі до архіву, правилах використання матеріалів і роботі сайту загалом.')
  ]),
  en: makeDoc([
    boldText('Welcome to the Lyatoshynsky Foundation website!'),
    normalText(
      ' We are glad that you are interested in Ukrainian music and the legacy of Borys Lyatoshynsky. This section is designed so that performers, researchers, and listeners can '
    ),
    boldText('easily navigate'),
    normalText(' the archive, usage rules, and the overall operation of the site.')
  ])
};

export const testDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    boldText('Цифрова нотна бібліотека'),
    normalText(' Фундації доступна усім '),
    boldText('зареєстрованим користувачам'),
    normalText(
      ' для особистого некомерційного використання. Це означає, що ви можете переглядати, завантажувати та використовувати ноти для навчання, дослідження та виконання.'
    )
  ]),
  en: makeDoc([
    boldText('The Digital Music Library'),
    normalText(' of the Foundation is available to all '),
    boldText('registered users'),
    normalText(
      ' for personal non-commercial use. This means you can view, download, and use the scores for learning, research, and performance.'
    )
  ])
};

export const archiveDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    boldText('Архів Фундації'),
    normalText(
      ' — це окрема колекція цифрових копій документів, що стосуються життя і творчості композитора: листів, рукописів, афіш, фотографій, партитур тощо. Матеріали архіву надаються для ознайомлення та дослідницької роботи. Архів поповнюється поступово — ми постійно оцифровуємо та додаємо нові документи.'
    )
  ]),
  en: makeDoc([
    boldText('The Foundation Archive'),
    normalText(
      ' is a separate collection of digital copies of documents related to the life and work of the composer: letters, manuscripts, posters, photographs, scores, and more. The archive is intended for familiarization and research purposes. It is updated gradually as we digitize and add new documents.'
    )
  ])
};

export const rightsDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Права на використання творів Бориса Лятошинського захищені законом. Їх публічне виконання, запис, тиражування чи включення до інших продуктів (наприклад, фільмів або мультимедіа) '
    ),
    boldText('можливе лише після відповідного ліцензування.')
  ]),
  en: makeDoc([
    normalText(
      'The rights to use the works of Borys Lyatoshynsky are protected by law. Their public performance, recording, reproduction, or inclusion in other products (such as films or multimedia) '
    ),
    boldText('is only possible after appropriate licensing.')
  ])
};

export const rightsManagementDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Управління авторськими правами на творчий доробок Бориса Лятошинського передано '),
    boldText('Українській Агенції Авторських і Суміжних Прав (УААСП) головою фундації та правовласницею Тетяною Гомон.')
  ]),
  en: makeDoc([
    normalText('The management of copyright for the creative works of Borys Lyatoshynsky has been transferred to '),
    boldText(
      'the Ukrainian Agency of Copyright and Related Rights (UAASP) by the Foundation’s head and rights holder Tetiana Homon.'
    )
  ])
};

export const privacyDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Уся персональна інформація захищена відповідно до '),
    linkText('Політики конфіденційності', ROUTES.PRIVACY_POLICY)
  ]),
  en: makeDoc([
    normalText('All personal information is protected in accordance with the '),
    linkText('Privacy Policy', ROUTES.PRIVACY_POLICY)
  ])
};

export const supportDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Ми прагнемо забезпечити стабільну роботу сайту. Якщо ви помітили технічну помилку або маєте труднощі з доступом до матеріалів — '
    ),
    linkText('напишіть нам', ROUTES.CONTACTS),
    normalText('.')
  ]),
  en: makeDoc([
    normalText(
      'We strive to ensure the stable operation of the site. If you notice a technical error or have difficulty accessing the materials — '
    ),
    linkText('contact us', ROUTES.CONTACTS),
    normalText('.')
  ])
};

export const registerDoc: LocalizedTipTapDoc = {
  uk: makeDoc([boldText('Для доступу до нотного архіву необхідно зареєструватися. Після реєстрації ви зможете:')]),
  en: makeDoc([
    boldText('To access the sheet music archive, you need to register. After registration, you will be able to:')
  ])
};

export const meaningDoc: LocalizedTipTapDoc = {
  uk: makeDoc([boldText('Що це означає для вас:')]),
  en: makeDoc([boldText('What this means for you:')])
};

export const rulesDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Користуючись цим сайтом, '),
    boldText('ви погоджуєтесь із правилами'),
    normalText(
      ', викладеними нижче. Вони покликані зробити користування сайтом зручним, безпечним і прозорим для всіх. Ми можемо час від часу оновлювати ці правила, тому рекомендуємо повертатися до цього розділу, особливо якщо ви плануєте використання архівних матеріалів.'
    )
  ]),
  en: makeDoc([
    normalText('By using this site, '),
    boldText('you agree to the rules'),
    normalText(
      ' outlined below. They are intended to make using the site convenient, safe, and transparent for everyone. We may update these rules from time to time, so we recommend checking this section, especially if you plan to use archival materials.'
    )
  ])
};

export const licenseDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText('Якщо ви є '),
    boldText('організатором концерту'),
    normalText(
      ' або плануєте трансляцію творів Лятошинського — зверніться до УААСП для оформлення відповідної ліцензії за '
    ),
    linkText('електронною адресою', 'mailto:liatoshynsky@gmail.com'),
    normalText('.')
  ]),
  en: makeDoc([
    normalText('If you are an '),
    boldText('organizer of a concert'),
    normalText(
      ' or plan to broadcast Lyatoshynsky’s works — please contact the UAASP to obtain the appropriate license via '
    ),
    linkText('email', 'mailto:liatoshynsky@gmail.com'),
    normalText('.')
  ])
};
