import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { getNavigationLink } from '~/lib/utils/navigationHelper';
import { ROUTES } from '~/shared/components/constants/routes';

export const actionsHelpPageData = {
  title: {
    uk: 'Долучитися до проєктів',
    en: 'Get Involved in Our Projects'
  },
  subtitle: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.multiLangText,
            text: {
              uk: 'До проєктів Фундації можна долучитися не лише фінансово. Нам потрібна професійна допомога в різних напрямах — від перекладів і роботи з текстами до фото, відео та цифрових матеріалів.',
              en: 'You can support the Foundation’s projects in ways other than financially. We welcome professional assistance in various areas, from translation and editorial work to photography, video production and digital content.'
            }
          }
        ]
      }
    ]
  } as TipTapDoc,
  paperItems: [
    {
      title: {
        uk: 'Перекласти',
        en: 'Translate'
      },
      description: {
        uk: 'Матеріали Фундації — програмки, статті, тексти для сайту та інші публікації — потребують перекладу іноземними мовами.',
        en: 'The Foundation’s materials—concert programmes, articles, website texts and other publications—need to be translated into foreign languages.'
      }
    },
    {
      title: {
        uk: 'Розповісти',
        en: 'Tell a Story'
      },
      description: {
        uk: 'Ми співпрацюємо з авторами, редакторами та журналістами для підготовки текстів, інтерв’ю та інших матеріалів.',
        en: 'We collaborate with authors, editors and journalists to prepare texts, interviews and other materials.'
      }
    },
    {
      title: {
        uk: 'Зафільмувати',
        en: 'Photograph and Film'
      },
      description: {
        uk: 'Концерти, виставки та інші події потребують фото- й відеодокументації, а також монтажу матеріалів для подальшого використання.',
        en: 'Concerts, exhibitions and other events require photographic and video documentation, as well as editing for future use.'
      }
    }
  ],
  paperButton: {
    text: {
      uk: 'Дізнатися більше про співпрацю',
      en: 'Learn more about collaboration'
    },
    link: ROUTES.HOME
  }
};

export async function getActionsHelpData() {
  let link: string = ROUTES.HOME;
  try {
    link = await getNavigationLink(ROUTES.COOPERATION, 'cooperation');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Could not get navigation link:', err);
  }

  return {
    title: actionsHelpPageData.title,
    subtitle: actionsHelpPageData.subtitle,
    paperItems: actionsHelpPageData.paperItems,
    paperButton: {
      ...actionsHelpPageData.paperButton,
      link
    }
  };
}
