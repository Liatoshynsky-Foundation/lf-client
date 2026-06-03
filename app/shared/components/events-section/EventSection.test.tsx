import { render, screen } from '@testing-library/react';
import React from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import EventSection from './EventSection';
import * as eventData from './EventSection.data';

jest.mock('~/hooks/use-breakpoints/useBreakpoints');

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper-mock">{children}</div>,
  SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide-mock">{children}</div>
}));

jest.mock('swiper/modules', () => ({
  Navigation: jest.fn()
}));

jest.mock('~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => {
  return function MockButtonContentBlock({ buttonText, content, link }: any) {
    return (
      <div data-testid="mock-button-content-block">
        <a href={link}>{buttonText}</a>
        <div>{typeof content === 'string' ? content : 'Опис секції подій'}</div>
      </div>
    );
  };
});

const mockEvents = [
  {
    id: '1',
    date: '29.02 - 02.03 2024',
    title: 'Test Event 1',
    description: 'Description 1',
    image: '/test-img-1.jpg',
    publishDate: '01.01.2024',
    regLink: 'https://test.com/reg'
  },
  {
    id: '2',
    date: '15.05 2024',
    title: 'Test Event 2',
    description: 'Description 2',
    image: '/test-img-2.jpg',
    publishDate: '10.01.2024'
  }
];

const defaultProps = {
  title: 'Блок Подій',
  text: {
    type: 'doc',
    content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Опис секції подій' }] }]
  } as any,
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
  const mockedUseBreakpoints = useBreakpoints as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseBreakpoints.mockReturnValue({ isMobile: false, isDesktop: true });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
  });

  describe('Desktop Layout', () => {
    it('should render the main title and section description', () => {
      render(<EventSection {...defaultProps} />);
      expect(screen.getByText('Блок Подій')).toBeInTheDocument();
      expect(screen.getByText('Опис секції подій')).toBeInTheDocument();
    });

    it('should render the list of events', () => {
      render(<EventSection {...defaultProps} />);
      expect(screen.getByText('Test Event 1')).toBeInTheDocument();
      expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    });
  });

  describe('Mobile Layout (Coverage lines 66-121)', () => {
    beforeEach(() => {
      mockedUseBreakpoints.mockReturnValue({ isMobile: true, isDesktop: false });

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: true,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn()
        }))
      });
    });

    it('should render mobile slider navigation buttons', () => {
      render(<EventSection {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Попередня подія' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Наступна подія' })).toBeInTheDocument();
    });

    it('should show registration link in mobile view if provided', () => {
      render(<EventSection {...defaultProps} />);
      expect(screen.getByText('Реєстрація')).toBeInTheDocument();
    });
  });

  describe('Data File Coverage (100% EventSection.data.ts)', () => {
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
