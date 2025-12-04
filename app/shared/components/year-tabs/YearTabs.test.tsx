import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import YearTabs from './YearTabs';

const MOCK_YEARS = ['2025', '2024', '2023'];

const mockUseBreakpoints = jest.fn();
jest.mock('~/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: () => mockUseBreakpoints()
}));

const mockUseScrollDirection = jest.fn();
jest.mock('~/hooks/use-scroll-direction/useScrollDirection', () => ({
  __esModule: true,
  useScrollDirection: () => mockUseScrollDirection()
}));

jest.mock('~/components/year-tabs/constants', () => ({
  __esModule: true,
  years: ['2025', '2024', '2023']
}));

jest.mock('~/ds-components/button-group/ButtonGroup', () => ({
  __esModule: true,
  default: ({ buttons, 'data-testid': dataTestId, sx, activeButton }: any) => (
    <div data-testid={dataTestId} style={sx} data-active-index={activeButton}>
      {buttons}
    </div>
  )
}));

const mockScrollTo = jest.fn();
globalThis.scrollTo = mockScrollTo;

let mockIntersectionObserverCallback: IntersectionObserverCallback;
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
const mockUnobserve = jest.fn();

globalThis.IntersectionObserver = jest.fn((callback) => {
  mockIntersectionObserverCallback = callback;
  return {
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: mockUnobserve
  } as unknown as IntersectionObserver;
});

const mockGetElementById = jest.fn();
document.getElementById = mockGetElementById;

const mockQuerySelectorAll = jest.fn();
document.querySelectorAll = mockQuerySelectorAll;

jest.useFakeTimers();

describe('YearTabs', () => {
  let mockElements: HTMLElement[];

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseBreakpoints.mockReturnValue({ isMobile: false });
    mockUseScrollDirection.mockReturnValue('up');
    globalThis.scrollY = 0;
    globalThis.pageYOffset = 0;

    mockElements = MOCK_YEARS.map((year) => {
      const el = document.createElement('div');
      el.id = `year-${year}`;
      el.getBoundingClientRect = jest.fn(() => ({ top: 150 }) as DOMRect);
      return el;
    });

    mockQuerySelectorAll.mockReturnValue(mockElements);
    mockGetElementById.mockImplementation((id) => mockElements.find((el) => el.id === id) || null);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render null on mobile devices', () => {
    mockUseBreakpoints.mockReturnValue({ isMobile: true });
    const { container } = render(<YearTabs years={MOCK_YEARS} />);

    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId('YearTabs')).not.toBeInTheDocument();
  });

  it('should render correctly on desktop with default values', () => {
    render(<YearTabs years={MOCK_YEARS} />);

    expect(screen.getByTestId('YearTabs')).toBeInTheDocument();

    const buttonGroup = screen.getByTestId('YearTabs-yearsGroup');
    expect(buttonGroup).toBeInTheDocument();

    for (const year of MOCK_YEARS) {
      expect(screen.getByText(year)).toBeInTheDocument();
    }

    expect(buttonGroup).toHaveAttribute('data-active-index', '0');
    expect(globalThis.IntersectionObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalledTimes(MOCK_YEARS.length);
  });

  it('should hide on scroll down and show on scroll up', () => {
    const { rerender } = render(<YearTabs years={MOCK_YEARS} />);
    const buttonGroup = screen.getByTestId('YearTabs-yearsGroup');

    expect(buttonGroup).toHaveStyle('transform: translate(-50%)');

    act(() => {
      globalThis.scrollY = 200;
      mockUseScrollDirection.mockReturnValue('down');
    });

    rerender(<YearTabs years={MOCK_YEARS} />);

    expect(buttonGroup).toHaveStyle('transform: translate(-50%, calc(100% + 5vh))');

    act(() => {
      globalThis.scrollY = 150;
      mockUseScrollDirection.mockReturnValue('up');
    });

    rerender(<YearTabs years={MOCK_YEARS} />);

    expect(buttonGroup).toHaveStyle('transform: translate(-50%)');
  });

  it('should scroll to the element and update state on year click', () => {
    const targetYear = MOCK_YEARS[1];
    const targetElement = mockElements[1];

    targetElement.getBoundingClientRect = jest.fn(() => ({ top: 500 }) as DOMRect);
    globalThis.pageYOffset = 100;

    render(<YearTabs years={MOCK_YEARS} />);
    const buttonGroup = screen.getByTestId('YearTabs-yearsGroup');

    const button2024 = screen.getByText(targetYear);
    fireEvent.click(button2024);

    expect(buttonGroup).toHaveAttribute('data-active-index', '1');

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 500,
      behavior: 'smooth'
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
  });

  it('should not call scrollTo if the year element is not found', () => {
    mockGetElementById.mockReturnValue(null);
    render(<YearTabs years={MOCK_YEARS} />);

    const button = screen.getByText(MOCK_YEARS[1]);
    fireEvent.click(button);

    const buttonGroup = screen.getByTestId('YearTabs-yearsGroup');
    expect(buttonGroup).toHaveAttribute('data-active-index', '1');

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should update active year when IntersectionObserver fires', () => {
    render(<YearTabs years={MOCK_YEARS} />);
    const buttonGroup = screen.getByTestId('YearTabs-yearsGroup');

    expect(buttonGroup).toHaveAttribute('data-active-index', '0');

    const mockEntry = {
      isIntersecting: true,
      target: mockElements[2],
      boundingClientRect: { top: 110 }
    } as unknown as IntersectionObserverEntry;

    const mockEntryFar = {
      isIntersecting: true,
      target: mockElements[1],
      boundingClientRect: { top: 300 }
    } as unknown as IntersectionObserverEntry;

    act(() => {
      mockIntersectionObserverCallback([mockEntry, mockEntryFar], null as any);
    });

    expect(buttonGroup).toHaveAttribute('data-active-index', '2');
  });

  it('should not update year from IntersectionObserver during click-scrolling', () => {
    render(<YearTabs years={MOCK_YEARS} />);
    const buttonGroup = screen.getByTestId('YearTabs-yearsGroup');

    fireEvent.click(screen.getByText(MOCK_YEARS[1]));
    expect(buttonGroup).toHaveAttribute('data-active-index', '1');

    const mockEntry = {
      isIntersecting: true,
      target: mockElements[2],
      boundingClientRect: { top: 110 }
    } as unknown as IntersectionObserverEntry;

    act(() => {
      mockIntersectionObserverCallback([mockEntry], null as any);
    });

    expect(buttonGroup).toHaveAttribute('data-active-index', '1');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      mockIntersectionObserverCallback([mockEntry], null as any);
    });

    expect(buttonGroup).toHaveAttribute('data-active-index', '2');
  });

  it('should not create IntersectionObserver if no elements are found', () => {
    mockQuerySelectorAll.mockReturnValue([]);
    render(<YearTabs years={MOCK_YEARS} />);

    expect(globalThis.IntersectionObserver).not.toHaveBeenCalled();
  });

  it('should remove scroll event listener on unmount', () => {
    const mockRemoveEventListener = jest.fn();
    globalThis.removeEventListener = mockRemoveEventListener as any;

    const { unmount } = render(<YearTabs years={MOCK_YEARS} />);
    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should disconnect IntersectionObserver on unmount', () => {
    const { unmount } = render(<YearTabs years={MOCK_YEARS} />);

    expect(globalThis.IntersectionObserver).toHaveBeenCalled();

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
