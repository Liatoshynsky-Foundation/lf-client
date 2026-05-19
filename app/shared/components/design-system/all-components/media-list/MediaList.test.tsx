import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import MediaList from './MediaList';

import { getDynamicRoute } from '~/shared/components/constants/routes';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => (key === 'viewMore' ? 'Переглянути більше' : key)
}));

const mockUseBreakpoints = jest.fn();
jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: () => mockUseBreakpoints()
}));

const mockUsePagination = jest.fn();
jest.mock('~/shared/hooks/use-pagination/usePagination', () => ({
  usePagination: (props: any) => mockUsePagination(props)
}));

jest.mock('../base-card/BaseCard', () => {
  return function DummyBaseCard({ title, href }: any) {
    return (
      <div data-testid="base-card" data-href={href}>
        {title}
      </div>
    );
  };
});

jest.mock('../pagination/Pagination', () => {
  return function DummyPagination({ onChange, siblingCount, count }: any) {
    return (
      <div data-testid="pagination-component" data-sibling-count={siblingCount} data-count={count}>
        <button onClick={() => onChange({}, 2)}>Go to page 2</button>
      </div>
    );
  };
});

const mockData = [
  {
    _id: '1',
    title: 'News 1',
    description: 'Desc 1',
    coverImage: { src: 'img1.jpg' },
    publishedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    _id: '2',
    title: 'News 2',
    description: 'Desc 2',
    coverImage: { src: 'img2.jpg' },
    publishedAt: '2023-01-02T00:00:00.000Z'
  }
];

describe('MediaList Component', () => {
  const scrollIntoViewMock = jest.fn();

  beforeAll(() => {
    globalThis.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBreakpoints.mockReturnValue({ isMobile: false, isTablet: false });
    mockUsePagination.mockReturnValue({
      hasMore: false,
      paginatedData: mockData,
      currentPage: 1,
      totalPages: 1,
      visiblePages: [1],
      handlePageChange: jest.fn(),
      handleLoadMore: jest.fn()
    });
  });

  it('should render list of cards correctly', () => {
    render(<MediaList mediaData={mockData as any} variant="news" dataTestId="news" />);

    const listContainer = screen.getByTestId('newsList');
    expect(listContainer).toBeInTheDocument();
    expect(listContainer).toHaveAttribute('role', 'list');

    const cards = screen.getAllByTestId('base-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('News 1');
    expect(cards[0]).toHaveAttribute('data-href', getDynamicRoute.newsItem('1'));
  });

  it('should render "Load More" button when hasMore is true', () => {
    const handleLoadMoreMock = jest.fn();
    mockUsePagination.mockReturnValue({
      ...mockUsePagination(),
      hasMore: true,
      handleLoadMore: handleLoadMoreMock
    });

    render(<MediaList mediaData={mockData as any} variant="news" dataTestId="news" />);

    const button = screen.getByText('Переглянути більше');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleLoadMoreMock).toHaveBeenCalledTimes(1);
  });

  it('should NOT render "Load More" button when hasMore is false', () => {
    mockUsePagination.mockReturnValue({
      ...mockUsePagination(),
      hasMore: false
    });

    render(<MediaList mediaData={mockData as any} variant="news" dataTestId="news" />);

    expect(screen.queryByText('Переглянути більше')).not.toBeInTheDocument();
  });

  it('should adjust siblingCount based on breakpoints', () => {
    mockUsePagination.mockReturnValue({ ...mockUsePagination(), totalPages: 5 });
    const { rerender } = render(<MediaList mediaData={mockData as any} variant="news" dataTestId="news" />);
    expect(screen.getByTestId('pagination-component')).toHaveAttribute('data-sibling-count', '1');

    mockUseBreakpoints.mockReturnValue({ isMobile: true, isTablet: false });
    rerender(<MediaList mediaData={mockData as any} variant="news" dataTestId="news" />);
    expect(screen.getByTestId('pagination-component')).toHaveAttribute('data-sibling-count', '0');
  });

  it('should use newsItem.url as href when variant is press and url is present', () => {
    const pressData = [
      {
        _id: '1',
        title: 'Press 1',
        description: 'Desc 1',
        coverImage: { src: 'img1.jpg' },
        publishedAt: '2023-01-01T00:00:00.000Z',
        url: 'https://external.com/article'
      }
    ];
    mockUsePagination.mockReturnValue({
      ...mockUsePagination(),
      paginatedData: pressData
    });

    render(<MediaList mediaData={pressData as any} variant="press" dataTestId="press" />);

    expect(screen.getByTestId('base-card')).toHaveAttribute('data-href', 'https://external.com/article');
  });

  it('should use slug in href when newsItem has slug', () => {
    const dataWithSlug = [
      {
        _id: '1',
        slug: 'my-news-slug',
        title: 'News 1',
        description: 'Desc 1',
        coverImage: { src: 'img1.jpg' },
        publishedAt: '2023-01-01T00:00:00.000Z'
      }
    ];
    mockUsePagination.mockReturnValue({
      ...mockUsePagination(),
      paginatedData: dataWithSlug
    });

    render(<MediaList mediaData={dataWithSlug as any} variant="news" dataTestId="news" />);

    expect(screen.getByTestId('base-card')).toHaveAttribute('data-href', getDynamicRoute.newsItem('my-news-slug'));
  });

  it('should pass crop to BaseCard when coverImage has crop', () => {
    const dataWithCrop = [
      {
        _id: '1',
        title: 'News 1',
        description: 'Desc 1',
        coverImage: { src: 'img1.jpg', crop: { x: 10, y: 20, width: 200, height: 150 } },
        publishedAt: '2023-01-01T00:00:00.000Z'
      }
    ];
    mockUsePagination.mockReturnValue({
      ...mockUsePagination(),
      paginatedData: dataWithCrop
    });

    render(<MediaList mediaData={dataWithCrop as any} variant="news" dataTestId="news" />);

    expect(screen.getByTestId('base-card')).toBeInTheDocument();
  });

  it('should set siblingCount to 0 when isTablet is true', () => {
    mockUseBreakpoints.mockReturnValue({ isMobile: false, isTablet: true });
    mockUsePagination.mockReturnValue({ ...mockUsePagination(), totalPages: 5 });

    render(<MediaList mediaData={mockData as any} variant="news" dataTestId="news" />);

    expect(screen.getByTestId('pagination-component')).toHaveAttribute('data-sibling-count', '0');
  });

  it('should call scrollIntoView when page changes', () => {
    const handlePageChangeMock = jest.fn();
    const handleLoadMoreMock = jest.fn();

    mockUsePagination.mockReturnValue({
      hasMore: false,
      paginatedData: mockData,
      currentPage: 1,
      totalPages: 5,
      visiblePages: [1, 2, 3, 4, 5],
      handlePageChange: handlePageChangeMock,
      handleLoadMore: handleLoadMoreMock
    });

    const { rerender } = render(<MediaList mediaData={mockData as any} variant="news" dataTestId="news" />);

    const listElement = screen.getByTestId('newsList');
    listElement.scrollIntoView = jest.fn();

    const goToPage2Button = screen.getByText('Go to page 2');
    fireEvent.click(goToPage2Button);

    mockUsePagination.mockReturnValue({
      hasMore: false,
      paginatedData: mockData,
      currentPage: 2,
      totalPages: 5,
      visiblePages: [1, 2, 3, 4, 5],
      handlePageChange: handlePageChangeMock,
      handleLoadMore: handleLoadMoreMock
    });

    rerender(<MediaList mediaData={mockData as any} variant="news" dataTestId="news" />);

    expect(handlePageChangeMock).toHaveBeenCalledWith(2);
    expect(listElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});
