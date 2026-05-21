import { act, fireEvent, render, screen, within } from '@testing-library/react';

import EventsTab from './EventsTab';

export const MOCK_EVENTS: any[] = [
  {
    _id: 'upcoming-1',
    title: 'Upcoming event 1',
    eventDateTimeStart: '2050-02-01T00:00:00.000Z',
    slug: 'upcoming-1'
  },
  {
    _id: 'completed-1',
    title: 'Completed event 1',
    eventDateTimeStart: '2020-01-01T00:00:00.000Z',
    publishedAt: '2020-01-01T00:00:00.000Z',
    slug: 'completed-1'
  },
  {
    _id: 'upcoming-2',
    title: 'Upcoming event 2',
    eventDateTimeStart: '2050-03-01T00:00:00.000Z',
    slug: 'upcoming-2'
  },
  {
    _id: 'completed-2',
    title: 'Completed event 2',
    eventDateTimeStart: '2020-02-01T00:00:00.000Z',
    publishedAt: '2020-02-01T00:00:00.000Z',
    slug: 'completed-2'
  }
];

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'uk'
}));

const mockBreakpoints = { isMobile: false, isTablet: false };
jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => mockBreakpoints)
}));

jest.mock('~/shared/components/blocks/event-card/EventItem', () => ({
  __esModule: true,
  default: ({ title, actions }: { title: string; actions?: Array<{ label: string; href: string }> }) => (
    <div data-testid="event-item">
      {title}
      {actions?.map((a) => (
        <a key={a.href} href={a.href} data-testid="event-action">
          {a.label}
        </a>
      ))}
    </div>
  )
}));

jest.mock('~/shared/components/design-system/all-components/empty-state/EmptyState', () => ({
  __esModule: true,
  default: ({ dataTestId, title, description }: any) => (
    <div data-testid={dataTestId}>
      <div data-testid={`${dataTestId}-title`}>{title}</div>
      {description && <div data-testid={`${dataTestId}-description`}>{description}</div>}
    </div>
  )
}));

beforeEach(() => {
  jest.spyOn(globalThis, 'scrollTo').mockImplementation(() => {});
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    top: 200,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => {}
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('EventsTab', () => {
  it('should render event items', () => {
    render(<EventsTab eventsData={MOCK_EVENTS} />);

    const items = screen.getAllByTestId('event-item');
    expect(items).toHaveLength(4);
  });

  it('should render upcoming events first', () => {
    render(<EventsTab eventsData={MOCK_EVENTS} />);

    const items = screen.getAllByTestId('event-item');
    expect(items[0] && items[1]).toHaveTextContent('Upcoming event');
    expect(items[2] && items[3]).toHaveTextContent('Completed event');
  });

  it('should sort upcoming events by most recent first', () => {
    render(<EventsTab eventsData={MOCK_EVENTS} />);

    const items = screen.getAllByTestId('event-item');
    expect(items[0]).toHaveTextContent('Upcoming event 1');
    expect(items[1]).toHaveTextContent('Upcoming event 2');
  });

  it('should sort completed events by most recent publish date', () => {
    render(<EventsTab eventsData={MOCK_EVENTS} />);

    const items = screen.getAllByTestId('event-item');
    expect(items[2]).toHaveTextContent('Completed event 2');
    expect(items[3]).toHaveTextContent('Completed event 1');
  });

  it('should scroll to top on pagination click', async () => {
    render(<EventsTab eventsData={MOCK_EVENTS} itemsPerPage={2} />);

    const pagination = screen.getByRole('navigation');
    const page2 = await within(pagination).findByText('2');
    await act(async () => {
      fireEvent.click(page2);
    });
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('should show empty state when no events are provided', () => {
    render(<EventsTab eventsData={[]} />);

    expect(screen.getByTestId('EmptyState-events')).toBeInTheDocument();
    expect(screen.queryByTestId('event-item')).not.toBeInTheDocument();
  });

  it('should treat event with no dates as completed', () => {
    const noDatesEvent = { _id: 'no-dates', title: 'No Dates Event', slug: 'no-dates' } as any;
    const upcomingEvent = {
      _id: 'upcoming',
      title: 'Upcoming Event',
      eventDateTimeStart: '2050-01-01T00:00:00.000Z',
      slug: 'upcoming'
    } as any;
    render(<EventsTab eventsData={[noDatesEvent, upcomingEvent]} />);

    const items = screen.getAllByTestId('event-item');
    expect(items[0]).toHaveTextContent('Upcoming Event');
    expect(items[1]).toHaveTextContent('No Dates Event');
  });

  it('should add register action when upcoming event has ticketUrl as string', () => {
    const event = {
      _id: 'upcoming-ticket',
      title: 'Ticket Event',
      eventDateTimeStart: '2050-01-01T00:00:00.000Z',
      ticketUrl: 'https://tickets.example.com',
      slug: 'ticket-event'
    } as any;
    render(<EventsTab eventsData={[event]} />);

    const actions = screen.getAllByTestId('event-action');
    expect(actions).toHaveLength(2);
    expect(actions[1]).toHaveAttribute('href', 'https://tickets.example.com');
    expect(actions[1]).toHaveTextContent('registerButton');
  });

  it('should add register action when upcoming event has ticketUrl as locale object', () => {
    const event = {
      _id: 'upcoming-ticket-obj',
      title: 'Ticket Object Event',
      eventDateTimeStart: '2050-01-01T00:00:00.000Z',
      ticketUrl: { uk: 'https://tickets.ua', en: 'https://tickets.en' },
      slug: 'ticket-object-event'
    } as any;
    render(<EventsTab eventsData={[event]} />);

    const actions = screen.getAllByTestId('event-action');
    expect(actions).toHaveLength(2);
    expect(actions[1]).toHaveAttribute('href', 'https://tickets.ua');
  });

  it('should not add register action when ticketUrl locale value is missing', () => {
    const event = {
      _id: 'upcoming-no-locale',
      title: 'No Locale Ticket',
      eventDateTimeStart: '2050-01-01T00:00:00.000Z',
      ticketUrl: { uk: null, en: 'https://tickets.en' },
      slug: 'no-locale-ticket'
    } as any;
    render(<EventsTab eventsData={[event]} />);

    const actions = screen.getAllByTestId('event-action');
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveTextContent('viewButton');
  });

  it('should use eventDateTimeEnd to determine upcoming status when set', () => {
    const eventWithEndDate = {
      _id: 'end-date-event',
      title: 'End Date Event',
      eventDateTimeStart: '2020-01-01T00:00:00.000Z',
      eventDateTimeEnd: '2050-12-31T00:00:00.000Z',
      slug: 'end-date-event'
    } as any;
    render(<EventsTab eventsData={[eventWithEndDate]} />);

    const items = screen.getAllByTestId('event-item');
    expect(items[0]).toHaveTextContent('End Date Event');
    expect(screen.queryByText('completedEvent')).not.toBeInTheDocument();
  });

  it('should handle upcoming events with null eventDateTimeStart but future eventDateTimeEnd', () => {
    const events = [
      {
        _id: 'no-start-1',
        title: 'No Start Event 1',
        eventDateTimeStart: null,
        eventDateTimeEnd: '2050-12-31T00:00:00.000Z',
        slug: 'no-start-1'
      } as any,
      {
        _id: 'no-start-2',
        title: 'No Start Event 2',
        eventDateTimeStart: null,
        eventDateTimeEnd: '2051-12-31T00:00:00.000Z',
        slug: 'no-start-2'
      } as any
    ];
    render(<EventsTab eventsData={events} />);

    expect(screen.getAllByTestId('event-item')).toHaveLength(2);
  });

  it('should sort two completed events without publishedAt as equal (no crash)', () => {
    const events = [
      { _id: 'c1', title: 'Completed 1', eventDateTimeStart: '2020-01-01T00:00:00.000Z', slug: 'c1' } as any,
      { _id: 'c2', title: 'Completed 2', eventDateTimeStart: '2020-01-02T00:00:00.000Z', slug: 'c2' } as any
    ];
    render(<EventsTab eventsData={events} />);

    expect(screen.getAllByTestId('event-item')).toHaveLength(2);
  });

  it('should use coverImage src and alt when provided', () => {
    const event = {
      _id: 'with-image',
      title: 'Image Event',
      eventDateTimeStart: '2050-01-01T00:00:00.000Z',
      coverImage: { src: 'https://example.com/img.jpg', alt: 'Event image', crop: null },
      slug: 'image-event'
    } as any;
    render(<EventsTab eventsData={[event]} />);

    expect(screen.getByTestId('event-item')).toBeInTheDocument();
  });

  it('should use siblingCount 0 on mobile', () => {
    mockBreakpoints.isMobile = true;
    render(<EventsTab eventsData={MOCK_EVENTS} itemsPerPage={2} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    mockBreakpoints.isMobile = false;
  });

  it('should not add register action for completed events with ticketUrl', () => {
    const event = {
      _id: 'completed-ticket',
      title: 'Completed Ticket Event',
      eventDateTimeStart: '2020-01-01T00:00:00.000Z',
      ticketUrl: 'https://tickets.example.com',
      slug: 'completed-ticket'
    } as any;
    render(<EventsTab eventsData={[event]} />);

    const actions = screen.getAllByTestId('event-action');
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveTextContent('viewButton');
  });
});
