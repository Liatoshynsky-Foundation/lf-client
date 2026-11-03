import { TipTapDoc } from '~/types/types/tiptap.types';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

type LocalizedTipTapDoc = {
  uk: TipTapDoc;
  en: TipTapDoc;
};

export const infoDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Благодійні внески можуть підтримувати поточну роботу Фундації або бути спрямовані на конкретний проєкт. Отримані кошти використовуються відповідно до статутних завдань Фундації.'
    )
  ]),
  en: makeDoc([
    normalText(
      'Charitable contributions may support the Foundation’s ongoing work or be directed towards a specific project. All funds received are used in accordance with the Foundation’s statutory objectives.'
    )
  ])
};

export const supportDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'За час роботи Фундації ми реалізовували проєкти в різних форматах співпраці — як ініціатори та партнери. Цей досвід дає змогу визначати формат роботи відповідно до завдань кожного конкретного проєкту.'
    )
  ]),
  en: makeDoc([
    normalText(
      'Over the course of the Foundation’s work, we have carried out projects through different forms of collaboration, both as initiators and as partners. This experience allows us to determine the most appropriate way of working for the objectives of each individual project.'
    )
  ])
};

export const partnersDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Участь партнерів і меценатів у проєктах Фундації зазначається в наших виданнях, інформаційних матеріалах та інших формах публічної комунікації. Формат представлення залежить від характеру співпраці та конкретного проєкту.'
    )
  ]),
  en: makeDoc([
    normalText(
      'The involvement of partners and patrons in the Foundation’s projects is acknowledged in our publications, information materials, and other forms of public communication. The form of acknowledgement depends on the nature of the collaboration and the specific project.'
    )
  ])
};

export const partnershipDoc: LocalizedTipTapDoc = {
  uk: makeDoc([
    normalText(
      'Для кожного спільного проєкту ми заздалегідь визначаємо завдання сторін, обсяг їхньої участі та відповідальності. За потреби домовленості закріплюються угодою.'
    )
  ]),
  en: makeDoc([
    normalText(
      'For each joint project, we agree in advance on the responsibilities of each party, the scope of their involvement, and their respective obligations. Where necessary, these arrangements are formalised in an agreement.'
    )
  ])
};
