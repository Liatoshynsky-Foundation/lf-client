import { TipTapDoc } from '~/types/types/tiptap.types';

import { linkText, makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { ROUTES } from '~/shared/components/constants/routes';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

const UACRR_CONTACTS_URL = 'https://uacrr.org.ua/contacts.html';
const UK_CONTACTS_HREF = `/uk${ROUTES.CONTACTS}`;
const EN_CONTACTS_HREF = `/en${ROUTES.CONTACTS}`;

export const introDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Цей розділ містить основні правила користування сайтом Фундації Лятошинського. Тут описано доступ до цифрової нотної бібліотеки й архівних матеріалів, умови їх використання та питання авторського права. Інформація стосується всіх відвідувачів сайту.'
    )
  ]),
  en: makeDoc([
    normalText(
      'This section outlines the main terms for using the Liatoshynsky Foundation website. It covers access to the digital sheet music library and archival materials, how they may be used, and copyright. These terms apply to all website visitors.'
    )
  ])
};

export const rulesDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Фундація Лятошинського залишає за собою право оновлювати умови користування сайтом без попереднього повідомлення. Рекомендуємо періодично ознайомлюватися з актуальною редакцією Умов користування, щоб бути в курсі чинних правил користування сайтом та використання розміщених на ньому нотних і архівних матеріалів.'
    )
  ]),
  en: makeDoc([
    normalText(
      'The Liatoshynsky Foundation reserves the right to update these Terms of Use without prior notice. We recommend reviewing the latest version periodically to stay informed about the current rules governing the use of the website and the sheet music and archival materials available on it.'
    )
  ])
};

export const libraryDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Цифрова нотна бібліотека Фундації Лятошинського надає доступ до нотних видань творів Бориса Лятошинського для навчання, дослідження та виконання. Нотні матеріали, доступні для вільного завантаження, можна завантажити безпосередньо зі сторінки «Творчість Лятошинського». Щоб отримати матеріали, які не перебувають у відкритому доступі, заповніть і надішліть відповідну '
    ),
    linkText('форму запиту', UK_CONTACTS_HREF),
    normalText('.')
  ]),
  en: makeDoc([
    normalText(
      'The Liatoshynsky Foundation’s digital sheet music library provides access to published scores of works by Borys Liatoshynsky for study, research, and performance. Sheet music available for free download can be downloaded directly from the “Liatoshynsky’s Works” page. To obtain materials that are not publicly available, please complete and submit the '
    ),
    linkText('request form', EN_CONTACTS_HREF),
    normalText('.')
  ])
};

export const archiveDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Цифровий архів містить документи з Архіву Кабінету-музею Бориса Лятошинського: листування, нотні та інші рукописи, афіші, фотографії й матеріали, пов’язані з життям і творчістю композитора. Архів відкритий для ознайомлення та дослідження й поступово поповнюється новими цифровими копіями матеріалів.'
    )
  ]),
  en: makeDoc([
    normalText(
      'The digital archive contains documents from the Archive of the Borys Liatoshynsky Studio-Museum, including correspondence, musical and other manuscripts, posters, photographs, and materials related to the composer’s life and work. The archive is open for consultation and research and is gradually being expanded with new digital copies of materials.'
    )
  ])
};

export const copyrightDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Твори Бориса Лятошинського охороняються законодавством про авторське право. Для їх публічного виконання, запису, трансляції, відтворення або використання в аудіовізуальних і мультимедійних проєктах необхідно отримати дозвіл відповідного правовласника або належну ліцензію, крім випадків, коли закон дозволяє таке використання без дозволу. Щоб уточнити порядок отримання дозволу для запланованого використання, зверніться до Фундації через '
    ),
    linkText('форму зворотного зв’язку', UK_CONTACTS_HREF),
    normalText(' або безпосередньо за контактними даними, зазначеними у футері сайту.')
  ]),
  en: makeDoc([
    normalText(
      'Works by Borys Liatoshynsky are protected by copyright law. You must obtain permission from the relevant rights holder or an appropriate licence to perform, record, broadcast, reproduce, or use them in audiovisual and multimedia projects, except where the law allows such use without permission. To clarify how to obtain permission for your intended use, contact the Foundation through the '
    ),
    linkText('feedback form', EN_CONTACTS_HREF),
    normalText(' or directly using the contact details in the website footer.')
  ])
};

export const rightsManagementDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Майновими авторськими правами на твори Бориса Лятошинського управляє Українська агенція з авторських та суміжних прав (УААСП) на підставі договору з правовласницею Тетяною Гомон, головою Фундації Лятошинського.'
    )
  ]),
  en: makeDoc([
    normalText(
      'The Ukrainian Agency of Copyright and Related Rights (UACRR) administers the economic rights to Borys Liatoshynsky’s works under an agreement with the rights holder, Tetiana Homon, Chair of the Liatoshynsky Foundation.'
    )
  ])
};

export const licenseDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Щоб отримати дозвіл на публічне виконання, запис або трансляцію творів Бориса Лятошинського, а також на їх використання у фільмах та інших проєктах, зверніться до УААСП: '
    ),
    linkText(UACRR_CONTACTS_URL, UACRR_CONTACTS_URL)
  ]),
  en: makeDoc([
    normalText(
      'To obtain permission to publicly perform, record, or broadcast Borys Liatoshynsky’s works, or to use them in films and other projects, contact UACRR: '
    ),
    linkText(UACRR_CONTACTS_URL, UACRR_CONTACTS_URL)
  ])
};

export const supportDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Якщо Вам не вдається отримати доступ до матеріалів або Ви помітили технічну помилку на сайті, зверніться до Фундації через '
    ),
    linkText('форму зворотного зв’язку', UK_CONTACTS_HREF),
    normalText(' або безпосередньо за контактними даними, зазначеними у футері сайту.')
  ]),
  en: makeDoc([
    normalText(
      'If you have difficulty accessing materials or notice a technical issue on the website, please contact the Foundation through the '
    ),
    linkText('feedback form', EN_CONTACTS_HREF),
    normalText(' or directly using the contact details in the website footer.')
  ])
};
