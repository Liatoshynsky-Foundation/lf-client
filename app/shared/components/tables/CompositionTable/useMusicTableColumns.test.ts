import { renderHook } from '@testing-library/react';

import { getCompositionColumnWidths } from './getColumnWidth';
import { useMusicTableColumns } from './useMusicTableColumns';

jest.mock('./getColumnWidth', () => ({
  getCompositionColumnWidths: jest.fn()
}));

const mockGetCompositionColumnWidths = getCompositionColumnWidths as jest.Mock;

describe('useMusicTableColumns', () => {
  const onOpenModalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCompositionColumnWidths.mockReturnValue({
      expander: '10%',
      opus: '20%'
    });
  });

  const defaultBreakpoints = {
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isLaptopAndAbove: false
  };

  it('should return all columns when on desktop or laptop', () => {
    const { result } = renderHook(() =>
      useMusicTableColumns({
        breakpoints: { ...defaultBreakpoints, isDesktop: true, isLaptopAndAbove: true },
        onOpenModal: onOpenModalMock
      })
    );

    const columns = result.current.columns;
    const columnIds = columns.map((c) => c.id);

    expect(columnIds).toEqual(['expander', 'opus', 'play', 'name', 'year', 'genre', 'actions']);
    expect(columns).toHaveLength(7);
  });

  it.each([
    { device: 'mobile', breakpoint: { isMobile: true } },
    { device: 'tablet', breakpoint: { isTablet: true } }
  ])('should filter out specific columns when on $device', ({ breakpoint }) => {
    const { result } = renderHook(() =>
      useMusicTableColumns({
        breakpoints: { ...defaultBreakpoints, ...breakpoint },
        onOpenModal: onOpenModalMock
      })
    );

    const columns = result.current.columns;
    const columnIds = columns.map((c) => c.id);

    expect(columnIds).not.toContain('opus');
    expect(columnIds).not.toContain('year');
    expect(columnIds).not.toContain('genre');
    expect(columnIds).not.toContain('play');

    expect(columnIds).toEqual(['expander', 'name', 'actions']);
    expect(columns).toHaveLength(3);
  });

  it('should call getCompositionColumnWidths with correct breakpoints', () => {
    const breakpoints = {
      isMobile: true,
      isTablet: false,
      isLaptop: false,
      isDesktop: false,
      isLaptopAndAbove: false
    };

    renderHook(() =>
      useMusicTableColumns({
        breakpoints,
        onOpenModal: onOpenModalMock
      })
    );

    expect(mockGetCompositionColumnWidths).toHaveBeenCalledWith({
      isMobile: true,
      isTablet: false,
      isLaptop: false,
      isDesktop: false,
      isLaptopAndAbove: false
    });
  });

  it('should pass onOpenModal to the actions cell renderer implicitly', () => {
    const { result } = renderHook(() =>
      useMusicTableColumns({
        breakpoints: { ...defaultBreakpoints, isDesktop: true },
        onOpenModal: onOpenModalMock
      })
    );

    const actionsColumn = result.current.columns.find((c) => c.id === 'actions');
    expect(actionsColumn).toBeDefined();
    expect(typeof actionsColumn?.cell).toBe('function');
  });
});
