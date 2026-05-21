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

jest.mock('~/shared/components/blocks/event-card/EventItem', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="event-item">{title}</div>
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
});
