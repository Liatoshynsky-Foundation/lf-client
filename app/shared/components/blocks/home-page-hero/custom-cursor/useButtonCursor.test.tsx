import { act, renderHook } from '@testing-library/react';

import { useButtonCursor } from './useButtonCursor';

describe('useButtonCursor', () => {
  interface MapListeners {
    scroll?: () => void;
  }

  const map: MapListeners = {};

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.style.removeProperty('cursor');
    window.addEventListener = jest.fn().mockImplementation((event: string, cb: () => void) => {
      if (event === 'scroll') map.scroll = cb;
    });
    window.removeEventListener = jest.fn();
  });

  it('should return initial values and register handlers properly', () => {
    const { result } = renderHook(() => useButtonCursor());

    expect(result.current.cursorConfig.isHovering).toBe(false);
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), {
      capture: true,
      passive: true
    });
  });

  it('should manipulate state and properties when hover events trigger', () => {
    const { result } = renderHook(() => useButtonCursor());

    let trackedX = 0;
    let trackedY = 0;

    jest.spyOn(result.current.cursorConfig.x, 'set').mockImplementation((v: number) => {
      trackedX = v;
    });
    jest.spyOn(result.current.cursorConfig.y, 'set').mockImplementation((v: number) => {
      trackedY = v;
    });
    jest.spyOn(result.current.cursorConfig.x, 'get').mockImplementation(() => trackedX);
    jest.spyOn(result.current.cursorConfig.y, 'get').mockImplementation(() => trackedY);

    const mockEnterEvent = { clientX: 100, clientY: 200 } as React.MouseEvent<HTMLElement>;

    act(() => {
      result.current.eventHandlers.onMouseEnter(mockEnterEvent);
    });

    expect(result.current.cursorConfig.isHovering).toBe(true);
    expect(result.current.cursorConfig.x.get()).toBe(100);
    expect(result.current.cursorConfig.y.get()).toBe(200);
    expect(document.body.style.getPropertyValue('cursor')).toBe('none');

    const mockMoveEvent = { clientX: 150, clientY: 250 } as React.MouseEvent<HTMLElement>;

    act(() => {
      result.current.eventHandlers.onMouseMove(mockMoveEvent);
    });

    expect(result.current.cursorConfig.x.get()).toBe(150);
    expect(result.current.cursorConfig.y.get()).toBe(250);

    act(() => {
      result.current.eventHandlers.onMouseLeave();
    });

    expect(result.current.cursorConfig.isHovering).toBe(false);
    expect(document.body.style.getPropertyValue('cursor')).toBe('');
  });

  it('should keep hovering true during scroll if pointer rests inside boundaries', () => {
    const { result } = renderHook(() => useButtonCursor());
    const mockElement = document.createElement('div');

    jest.spyOn(result.current.cursorConfig.x, 'get').mockReturnValue(100);
    jest.spyOn(result.current.cursorConfig.y, 'get').mockReturnValue(100);

    jest.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
      left: 50,
      right: 200,
      top: 50,
      bottom: 200,
      width: 150,
      height: 150,
      x: 50,
      y: 50,
      toJSON: () => {}
    });

    result.current.ref.current = mockElement;

    act(() => {
      result.current.eventHandlers.onMouseEnter({ clientX: 100, clientY: 100 } as React.MouseEvent<HTMLElement>);
    });

    act(() => {
      if (map.scroll) map.scroll();
    });

    expect(result.current.cursorConfig.isHovering).toBe(true);
  });

  it('should reset hovering state during scroll if pointer moves outside boundaries', () => {
    const { result } = renderHook(() => useButtonCursor());
    const mockElement = document.createElement('div');

    jest.spyOn(result.current.cursorConfig.x, 'get').mockReturnValue(300);
    jest.spyOn(result.current.cursorConfig.y, 'get').mockReturnValue(300);

    jest.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
      left: 50,
      right: 200,
      top: 50,
      bottom: 200,
      width: 150,
      height: 150,
      x: 50,
      y: 50,
      toJSON: () => {}
    });

    result.current.ref.current = mockElement;

    act(() => {
      result.current.eventHandlers.onMouseEnter({ clientX: 300, clientY: 300 } as React.MouseEvent<HTMLElement>);
    });

    act(() => {
      if (map.scroll) map.scroll();
    });

    expect(result.current.cursorConfig.isHovering).toBe(false);
  });

  it('should do nothing on scroll if reference object is unassigned', () => {
    const { result } = renderHook(() => useButtonCursor());

    act(() => {
      result.current.eventHandlers.onMouseEnter({ clientX: 100, clientY: 100 } as React.MouseEvent<HTMLElement>);
    });

    result.current.ref.current = null;

    act(() => {
      if (map.scroll) map.scroll();
    });

    expect(result.current.cursorConfig.isHovering).toBe(true);
  });
});
