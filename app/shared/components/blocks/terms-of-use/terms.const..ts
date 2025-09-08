import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/common.types';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const registerListKeys = ['downloadNotes', 'saveNotes', 'subscribeNews'] as const;

export const behaviorListKeys = ['useResponsibly', 'noSharing', 'noPublicPosting'] as const;

export const introDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }],
            text: 'Вітаємо на сайті Фундації Лятошинського!'
          },
          {
            type: TipTapNodeTypes.text,
            text: ' Радіємо, що ви зацікавилися українською музикою і спадщиною Бориса Лятошинського. Цей розділ створений для того, щоб користувачі сайту – виконавці, дослідники, слухачі – '
          },
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'легко орієнтувалися' },
          {
            type: TipTapNodeTypes.text,
            text: ' в доступі до архіву, правилах використання матеріалів і роботі сайту загалом.'
          }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }],
            text: 'Welcome to the Lyatoshynsky Foundation website!'
          },
          {
            type: TipTapNodeTypes.text,
            text: ' We are glad that you are interested in Ukrainian music and the legacy of Borys Lyatoshynsky. This section is designed so that performers, researchers, and listeners can '
          },
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'easily navigate' },
          { type: TipTapNodeTypes.text, text: ' the archive, usage rules, and the overall operation of the site.' }
        ]
      }
    ]
  }
};

export const testDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'Цифрова нотна бібліотека' },
          { type: TipTapNodeTypes.text, text: ' Фундації доступна усім' },
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'зареєстрованим користувачам' },
          {
            type: TipTapNodeTypes.text,
            text: ' для особистого некомерційного використання. Це означає, що ви можете переглядати, завантажувати та використовувати ноти для навчання, дослідження та виконання.'
          }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'The Digital Music Library' },
          { type: TipTapNodeTypes.text, text: ' of the Foundation is available to all ' },
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'registered users' },
          {
            type: TipTapNodeTypes.text,
            text: ' for personal non-commercial use. This means you can view, download, and use the scores for learning, research, and performance.'
          }
        ]
      }
    ]
  }
};

export const archiveDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'Архів Фундації' },
          {
            type: TipTapNodeTypes.text,
            text: ' — це окрема колекція цифрових копій документів, що стосуються життя і творчості композитора: листів, рукописів, афіш, фотографій, партитур тощо. Матеріали архіву надаються для ознайомлення та дослідницької роботи. Архів поповнюється поступово — ми постійно оцифровуємо та додаємо нові документи.'
          }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'The Foundation Archive' },
          {
            type: TipTapNodeTypes.text,
            text: ' is a separate collection of digital copies of documents related to the life and work of the composer: letters, manuscripts, posters, photographs, scores, and more. The archive is intended for familiarization and research purposes. It is updated gradually as we digitize and add new documents.'
          }
        ]
      }
    ]
  }
};

export const rightsDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'Права на використання творів Бориса Лятошинського захищені законом. Їх публічне виконання, запис, тиражування чи включення до інших продуктів (наприклад, фільмів або мультимедіа) '
          },
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }],
            text: 'можливе лише після відповідного ліцензування.'
          }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'The rights to use the works of Borys Lyatoshynsky are protected by law. Their public performance, recording, reproduction, or inclusion in other products (such as films or multimedia) '
          },
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }],
            text: 'is only possible after appropriate licensing.'
          }
        ]
      }
    ]
  }
};

export const rightsManagementDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'Управління авторськими правами на творчий доробок Бориса Лятошинського передано '
          },
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }],
            text: 'Українській Агенції Авторських і Суміжних Прав (УААСП) головою фундації та правовласницею Тетяною Гомон.'
          }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'The management of copyright for the creative works of Borys Lyatoshynsky has been transferred to '
          },
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }],
            text: 'the Ukrainian Agency of Copyright and Related Rights (UAASP) by the Foundation’s head and rights holder Tetiana Homon.'
          }
        ]
      }
    ]
  }
};

export const privacyDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, text: 'Уся персональна інформація захищена відповідно до ' },
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }, { type: TipTapMarkType.underline }],
            text: 'Політики конфіденційності'
          }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, text: 'All personal information is protected in accordance with the ' },
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }, { type: TipTapMarkType.underline }],
            text: 'Privacy Policy'
          }
        ]
      }
    ]
  }
};

export const supportDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'Ми прагнемо забезпечити стабільну роботу сайту. Якщо ви помітили технічну помилку або маєте труднощі з доступом до матеріалів — '
          },
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }, { type: TipTapMarkType.underline }],
            text: 'напишіть нам'
          },
          { type: TipTapNodeTypes.text, text: '.' }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'We strive to ensure the stable operation of the site. If you notice a technical error or have difficulty accessing the materials — '
          },
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }, { type: TipTapMarkType.underline }],
            text: 'contact us'
          },
          { type: TipTapNodeTypes.text, text: '.' }
        ]
      }
    ]
  }
};

export const registerDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }],
            text: 'Для доступу до нотного архіву необхідно зареєструватися. Після реєстрації ви зможете:'
          }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            marks: [{ type: TipTapMarkType.bold }],
            text: 'To access the sheet music archive, you need to register. After registration, you will be able to:'
          }
        ]
      }
    ]
  }
};

export const meaningDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'Що це означає для вас:' }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'What this means for you:' }
        ]
      }
    ]
  }
};

export const rulesDoc: LocalizedTipTapDoc = {
  uk: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, text: 'Користуючись цим сайтом, ' },
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'ви погоджуєтесь із правилами' },
          {
            type: TipTapNodeTypes.text,
            text: ', викладеними нижче. Вони покликані зробити користування сайтом зручним, безпечним і прозорим для всіх. Ми можемо час від часу оновлювати ці правила, тому рекомендуємо повертатися до цього розділу, особливо якщо ви плануєте використання архівних матеріалів.'
          }
        ]
      }
    ]
  },
  en: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          { type: TipTapNodeTypes.text, text: 'By using this site, ' },
          { type: TipTapNodeTypes.text, marks: [{ type: TipTapMarkType.bold }], text: 'you agree to the rules' },
          {
            type: TipTapNodeTypes.text,
            text: ' outlined below. They are intended to make using the site convenient, safe, and transparent for everyone. We may update these rules from time to time, so we recommend checking this section, especially if you plan to use archival materials.'
          }
        ]
      }
    ]
  }
};
