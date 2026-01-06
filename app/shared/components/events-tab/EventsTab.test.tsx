import { act, fireEvent, render, screen, within } from '@testing-library/react';

import EventsTab from './EventsTab';

import type { EventItemProps } from '~/shared/components/blocks/event-card/EventItem';
import { EventItemFixture } from '~/shared/components/blocks/event-card/EventItem.fixture';

export const MOCK_EVENTS: ReadonlyArray<EventItemFixture> = [
  {
    id: 'upcoming-1',
    props: {
      title: 'Upcoming event 1',
      date: {
        startDate: '2025-02-01',
        endDate: '2025-02-02'
      }
    } as EventItemProps
  },
  {
    id: 'completed-1',
    props: {
      title: 'Completed event 1',
      statusLabel: 'completed',
      publishedAt: '2025-01-01T00:00:00.000Z'
    } as EventItemProps
  },
  {
    id: 'upcoming-2',
    props: {
      title: 'Upcoming event 2',
      date: {
        startDate: '2025-03-01',
        endDate: '2025-02-02'
      }
    } as EventItemProps
  },
  {
    id: 'completed-2',
    props: {
      title: 'Completed event 2',
      statusLabel: 'completed',
      publishedAt: '2025-02-01T00:00:00.000Z'
    } as EventItemProps
  }
];

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/shared/components/blocks/event-card/EventItem', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="event-item">{title}</div>
}));

beforeEach(() => {
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
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
});
