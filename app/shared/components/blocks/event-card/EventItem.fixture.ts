import type { EventItemProps } from './EventItem';

export interface EventItemFixture {
  id: string;
  props: EventItemProps;
}

export const MOCK_EVENT_ITEMS: Readonly<EventItemFixture[]> = [
  {
    id: 'festival-weekend-1',
    props: {
      date: {
        startDate: '2024-02-29',
        endDate: '2024-03-02'
      },
      title: 'У Києві стартує фестиваль музики Бориса Лятошинського. Чому варто відвідати',
      publishedAt: '2025-05-05T00:00:00.000Z',
      description:
        'Прийдешнього 2025 року відзначатиметься 130-річчя від дня народження Бориса Лятошинського (1895–1968)',
      image: {
        src: '/images/events/festival-lyatoshynsky.png',
        alt: 'Виконавці на сцені фестивалю Бориса Лятошинського'
      },
      actions: [
        {
          label: 'Переглянути',
          href: '/uk/media/festival-borysa-lyatoshynskoho'
        },
        {
          label: 'Реєстрація',
          href: '/uk/media/festival-borysa-lyatoshynskoho/registration'
        }
      ]
    }
  },
  {
    id: 'festival-weekend-2',
    props: {
      date: {
        startDate: '2024-02-29',
        endDate: '2024-03-02'
      },
      title: 'У Києві стартує фестиваль музики Бориса Лятошинського. Чому варто відвідати',
      publishedAt: '2025-05-05T00:00:00.000Z',
      description:
        'Прийдешнього 2025 року відзначатиметься 130-річчя від дня народження Бориса Лятошинського (1895–1968)',
      image: {
        src: '/images/events/festival-lyatoshynsky.png',
        alt: 'Виконавці на сцені фестивалю Бориса Лятошинського'
      },
      actions: [
        {
          label: 'Переглянути',
          href: '/uk/media/festival-borysa-lyatoshynskoho'
        },
        {
          label: 'Реєстрація',
          href: '/uk/media/festival-borysa-lyatoshynskoho/registration'
        }
      ]
    }
  }
];
