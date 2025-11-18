import { FundSummaryHeaderData } from './FundSummaryHeader';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

type Locale = 'uk' | 'en';
type LocalizedString = Record<Locale, string>;

export const fundSummaryBacklinkUrl: string = '/archive';
export const fundSummaryBacklinkText: LocalizedString = {
  uk: 'Повернутись до архіву',
  en: 'Back to archive'
};

export const fundSummaryTitle: LocalizedString = {
  uk: 'Фонд 2. Особисті документи',
  en: 'Fund 2. Personal Documents'
};

export const fundSummaryContent: FundSummaryHeaderData = {
  items: [
    {
      title: {
        uk: 'Кількість описів',
        en: 'Number of inventories'
      },
      description: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: '2' }] }]
        },
        en: {
          type: TipTapNodeTypes.doc,
          content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: '2' }] }]
        }
      }
    },
    {
      title: {
        uk: 'Кількість справ',
        en: 'Number of cases'
      },
      description: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: '9' }] }]
        },
        en: {
          type: TipTapNodeTypes.doc,
          content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: '9' }] }]
        }
      }
    },
    {
      title: {
        uk: 'Форма упорядкування',
        en: 'Form of arrangement'
      },
      description: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [
            {
              type: TipTapNodeTypes.paragraph,
              content: [{ type: TipTapNodeTypes.text, text: 'тематико-хронологічна' }]
            }
          ]
        },
        en: {
          type: TipTapNodeTypes.doc,
          content: [
            {
              type: TipTapNodeTypes.paragraph,
              content: [{ type: TipTapNodeTypes.text, text: 'thematic-chronological' }]
            }
          ]
        }
      }
    },
    {
      title: {
        uk: 'Дата утворення документів',
        en: 'Date of document creation'
      },
      description: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: '1895-1971' }] }]
        },
        en: {
          type: TipTapNodeTypes.doc,
          content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: '1895-1971' }] }]
        }
      }
    },
    {
      title: {
        uk: 'Хронологічні межі',
        en: 'Chronological boundaries'
      },
      description: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: '1895-1971' }] }]
        },
        en: {
          type: TipTapNodeTypes.doc,
          content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: '1895-1971' }] }]
        }
      }
    },
    {
      title: {
        uk: 'Мова документів',
        en: 'Language of documents'
      },
      description: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [
            {
              type: TipTapNodeTypes.paragraph,
              content: [{ type: TipTapNodeTypes.text, text: 'переважно російська, частково українська, польська' }]
            }
          ]
        },
        en: {
          type: TipTapNodeTypes.doc,
          content: [
            {
              type: TipTapNodeTypes.paragraph,
              content: [{ type: TipTapNodeTypes.text, text: 'mainly Russian, partially Ukrainian, Polish' }]
            }
          ]
        }
      }
    },
    {
      title: {
        uk: 'Характер і зміст документів',
        en: 'Nature and content of documents'
      },
      description: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [
            {
              type: TipTapNodeTypes.paragraph,
              content: [
                {
                  type: TipTapNodeTypes.text,
                  text: 'Документи про освіту, трудову діяльність, нагороди, автобіографічні матеріали, військову службу, членство в організаціях, поїздки за кордон тощо.'
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
                  text: 'Documents about education, work activity, awards, autobiographical materials, military service, membership in organizations, trips abroad, etc.'
                }
              ]
            }
          ]
        }
      }
    },
    {
      title: {
        uk: 'Умови доступу',
        en: 'Access conditions'
      },
      description: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [
            {
              type: TipTapNodeTypes.paragraph,
              content: [
                {
                  type: TipTapNodeTypes.text,
                  text: 'Доступ вільний. Документи, що містять персональні дані, надаються для ознайомлення відповідно до законодавства про захист персональної інформації.'
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
                  text: 'Access is free. Documents containing personal data are provided for review in accordance with legislation on the protection of personal information.'
                }
              ]
            }
          ]
        }
      }
    },
    {
      title: {
        uk: 'Відомості про укладача',
        en: 'Information about the compiler'
      },
      description: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [
            {
              type: TipTapNodeTypes.paragraph,
              content: [{ type: TipTapNodeTypes.text, text: 'Ірина Тукова (07.07.2025), Олександра Чеботар' }]
            }
          ]
        },
        en: {
          type: TipTapNodeTypes.doc,
          content: [
            {
              type: TipTapNodeTypes.paragraph,
              content: [{ type: TipTapNodeTypes.text, text: 'Iryna Tukova (07.07.2025), Oleksandra Chebotar' }]
            }
          ]
        }
      }
    }
  ]
};
