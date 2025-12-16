import { fireEvent, render, screen } from '@testing-library/react';

import EventsTab from './EventsTab';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => () => ({
  isMobile: false,
  isTablet: false
}));

jest.mock('~/shared/components/blocks/event-card/EventItem', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div data-testid="event-item">{title}</div>
}));

jest.mock('~/ds-components/pagination/Pagination', () => ({
  __esModule: true,
  default: ({ onChange }: any) => (
    <button data-testid="pagination" onClick={() => onChange(null, 2)}>
      Go to page 2
    </button>
  )
}));

jest.mock('~/ds-components/button/Button', () => ({
  __esModule: true,
  default: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>
}));

const handleLoadMore = jest.fn();
const handlePageChange = jest.fn();

jest.mock('~/hooks/use-pagination/usePagination', () => ({
  usePagination: () => ({
    hasMore: true,
    paginatedData: [
      { id: '1', props: { title: 'Event 1' } },
      { id: '2', props: { title: 'Event 2' } }
    ],
    currentPage: 1,
    totalPages: 3,
    visiblePages: [1, 2, 3],
    handleLoadMore,
    handlePageChange
  })
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('EventsTab', () => {
  it('should render event items', () => {
    render(<EventsTab />);

    const items = screen.getAllByTestId('event-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Event 1');
    expect(items[1]).toHaveTextContent('Event 2');
  });

  it('should render "View more" button when hasMore is true', () => {
    render(<EventsTab />);

    expect(screen.getByText('viewMore')).toBeInTheDocument();
  });

  it('should call handleLoadMore when "View more" is clicked', () => {
    render(<EventsTab />);

    fireEvent.click(screen.getByText('viewMore'));
    expect(handleLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should render pagination when totalPages > 1', () => {
    render(<EventsTab />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should change page on pagination click', () => {
    render(<EventsTab itemsPerPage={1} />);

    fireEvent.click(screen.getByTestId('pagination'));

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
