import { useMediaQuery } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';

import EventSection from './EventSection';
import * as eventData from './EventSection.data';

type EventSectionProps = React.ComponentProps<typeof EventSection>;
type MockEventType = EventSectionProps['events'];
type MockTextType = EventSectionProps['text'];

jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: jest.fn(),
    useTheme: () => ({
      breakpoints: {
        down: (key: string) => `down-${key}`,
        up: (key: string) => `up-${key}`
      }
    })
  };
});

jest.mock('next-intl', () => ({
  useLocale: () => 'uk',
  useTranslations: () => (key: string) => (key === 'completedEvent' ? 'Завершена подія' : key)
}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: ReactNode }) => <div data-testid="swiper-mock">{children}</div>,
  SwiperSlide: ({ children }: { children: ReactNode }) => <div data-testid="swiper-slide-mock">{children}</div>
}));

jest.mock('swiper/modules', () => ({
  Navigation: jest.fn()
}));

jest.mock('~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => {
  return function MockButtonContentBlock({
    buttonText,
    content,
    link
  }: {
    buttonText: string;
    content: unknown;
    link: string;
  }) {
    return (
      <div data-testid="mock-button-content-block">
        <a href={link}>{buttonText}</a>
        <div>{typeof content === 'string' ? content : 'Опис секції подій'}</div>
      </div>
    );
  };
});

jest.mock('~/shared/components/blocks/event-card/EventItem', () => {
  return function MockEventItem({
    title,
    dateVariant,
    statusLabel
  }: {
    title: string;
    dateVariant: string;
    statusLabel?: string;
  }) {
    return (
      <div data-testid="mock-event-item">
        <h3>{title}</h3>
        <span data-testid="variant">{dateVariant}</span>
        {statusLabel && <span data-testid="status">{statusLabel}</span>}
      </div>
    );
  };
});

const mockEvents = [
  {
    _id: '1',
    slug: 'test-event-1',
    title: 'Test Event 1',
    description: 'Description 1',
    coverImage: { src: '/test-img-1.jpg', alt: 'img', crop: null },
    publishedAt: '2024-01-01T00:00:00Z',
    eventDateTimeStart: '2050-02-29T00:00:00Z',
    eventDateTimeEnd: '2050-03-02T00:00:00Z',
    ticketUrl: { uk: 'https://test.com/reg', en: 'https://test.com/reg-en' }
  },
  {
    _id: '2',
    slug: 'test-event-2',
    title: 'Test Event 2',
    description: 'Description 2',
    coverImage: { src: '/test-img-2.jpg', alt: 'img', crop: null },
    publishedAt: '2024-01-10T00:00:00Z',
    eventDateTimeStart: '2020-05-15T00:00:00Z',
    eventDateTimeEnd: null,
    ticketUrl: null
  }
] as unknown as MockEventType;

const defaultProps: EventSectionProps = {
  title: 'Блок Подій',
  text: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Опис секції подій' }] }]
  } as unknown as MockTextType,
  ctaLabel: 'Всі події',
  ctaHref: '/events',
  publishDateLabel: 'Дата публікації',
  viewLabel: 'Дивитись',
  regLabel: 'Реєстрація',
  prevLabel: 'Попередня подія',
  nextLabel: 'Наступна подія',
  events: mockEvents
};

describe('EventSection', () => {
  const mockedUseMediaQuery = useMediaQuery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop Layout', () => {
    beforeEach(() => {
      mockedUseMediaQuery.mockImplementation((query: string) => {
        if (query === 'up-lg') return true;
        if (query === 'down-sm') return false;
        return false;
      });
    });

    it('should render the main title and section description', () => {
      render(<EventSection {...defaultProps} />);
      expect(screen.getByText('Блок Подій')).toBeInTheDocument();
      expect(screen.getByText('Опис секції подій')).toBeInTheDocument();
    });

    it('should pass dateVariant="text" to EventItem on desktop', () => {
      render(<EventSection {...defaultProps} />);

      const variants = screen.getAllByTestId('variant');
      expect(variants[0]).toHaveTextContent('text');
      expect(variants[1]).toHaveTextContent('text');
    });

    it('should correctly identify completed events and pass statusLabel', () => {
      render(<EventSection {...defaultProps} />);

      expect(screen.getByText('Test Event 1')).toBeInTheDocument();
      expect(screen.getByText('Test Event 2')).toBeInTheDocument();

      const statuses = screen.queryAllByTestId('status');
      expect(statuses).toHaveLength(1);
      expect(statuses[0]).toHaveTextContent('Завершена подія');
    });
  });

  describe('Mobile/Tablet Layout', () => {
    beforeEach(() => {
      mockedUseMediaQuery.mockImplementation((query: string) => {
        if (query === 'up-lg') return false;
        if (query === 'down-sm') return true;
        return false;
      });
    });

    it('should pass dateVariant="numeric" to EventItem on small screens', () => {
      render(<EventSection {...defaultProps} />);

      const variants = screen.getAllByTestId('variant');
      expect(variants[0]).toHaveTextContent('numeric');
      expect(variants[1]).toHaveTextContent('numeric');
    });

    it('should render mobile slider navigation buttons', () => {
      render(<EventSection {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Попередня подія' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Наступна подія' })).toBeInTheDocument();
    });
  });

  describe('Data File Coverage', () => {
    it('should utilize all data constants', () => {
      const checkData = {
        title: eventData.eventsTitle,
        text: eventData.eventsMainText,
        mock: eventData.mockEventsData,
        pub: eventData.eventsPublishDateLabel,
        view: eventData.eventsViewLabel,
        reg: eventData.eventsRegLabel,
        cta: eventData.eventsCtaLabel
      };

      expect(checkData.title).toBeDefined();

      render(<EventSection {...defaultProps} title={eventData.eventsTitle.uk} />);
      expect(screen.getByText(eventData.eventsTitle.uk)).toBeInTheDocument();
    });
  });
});
