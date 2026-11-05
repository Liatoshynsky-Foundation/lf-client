import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

export const collaborationIntroPageData = {
  uk: {
    title: 'Співпраця',
    subtitle: 'Спільна робота',
    contentAbove: makeDoc([
      normalText(
        'Проєкти Фундації передбачають співпрацю з фахівцями та інституціями різного профілю. Залежно від завдання ми шукаємо партнерів або долучаємося до проєктів, запропонованих іншими.'
      )
    ]),
    content: makeDoc([
      normalText(
        'Формати співпраці можуть бути різними — конкретний формат визначається змістом і завданнями кожного проєкту.'
      )
    ])
  },
  en: {
    title: 'Collaboration',
    subtitle: 'Working Together',
    contentAbove: makeDoc([
      normalText(
        'The Foundation’s projects involve collaboration with professionals and institutions from a range of fields. Depending on the project, we either seek partners or join projects initiated by others.'
      )
    ]),
    content: makeDoc([
      normalText(
        'Collaboration can take different forms, with the specific format determined by the nature and objectives of each project.'
      )
    ])
  }
};
