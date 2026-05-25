import { act, renderHook } from '@testing-library/react';

import { useImageCrop } from './useImageCrop';

import type { CropRect } from '~/lib/utils/cropUtils';

describe('useImageCrop hook', () => {
  const mockCrop: CropRect = { x: 10, y: 10, width: 100, height: 100 };
  let observeMock: jest.Mock;
  let disconnectMock: jest.Mock;
  let resizeCallback: ResizeObserverCallback;

  beforeEach(() => {
    observeMock = jest.fn();
    disconnectMock = jest.fn();

    globalThis.ResizeObserver = jest.fn().mockImplementation((cb: ResizeObserverCallback) => {
      resizeCallback = cb;
      return {
        observe: observeMock,
        unobserve: jest.fn(),
        disconnect: disconnectMock
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should NOT initialize ResizeObserver if crop is missing', () => {
    renderHook(() => useImageCrop());
    expect(globalThis.ResizeObserver).not.toHaveBeenCalled();
  });

  it('should return initial refs and fallback styles when sizes are 0', () => {
    const { result } = renderHook(() => useImageCrop(mockCrop));

    expect(result.current.containerRef).toEqual({ current: null });
    expect(result.current.imgRef).toEqual({ current: null });
    expect(result.current.croppedImgStyle.objectFit).toBe('cover');
  });

  it('should initialize ResizeObserver and update container size when ref is set', () => {
    const { result, rerender } = renderHook(({ currentCrop }) => useImageCrop(currentCrop), {
      initialProps: { currentCrop: undefined as CropRect | undefined }
    });

    const div = document.createElement('div');
    (result.current.containerRef as React.RefObject<HTMLDivElement>).current = div;

    rerender({ currentCrop: mockCrop });

    expect(observeMock).toHaveBeenCalledWith(div);

    act(() => {
      resizeCallback([{ contentRect: { width: 500, height: 400 } } as ResizeObserverEntry], {} as ResizeObserver);
    });

    act(() => {
      result.current.handleImageLoad({
        currentTarget: { naturalWidth: 1000, naturalHeight: 800 }
      } as unknown as React.SyntheticEvent<HTMLImageElement>);
    });

    expect(result.current.croppedImgStyle.position).toBe('absolute');
    expect(result.current.croppedImgStyle.objectFit).toBeUndefined();
  });

  it('should call disconnect on unmount', () => {
    const { result, rerender, unmount } = renderHook(({ currentCrop }) => useImageCrop(currentCrop), {
      initialProps: { currentCrop: undefined as CropRect | undefined }
    });

    const div = document.createElement('div');
    (result.current.containerRef as React.RefObject<HTMLDivElement>).current = div;

    rerender({ currentCrop: mockCrop });

    unmount();

    expect(disconnectMock).toHaveBeenCalled();
  });

  it('should update natural size automatically if image is already cached (complete === true)', () => {
    const { result, rerender } = renderHook(({ currentCrop }) => useImageCrop(currentCrop), {
      initialProps: { currentCrop: undefined as CropRect | undefined }
    });

    const div = document.createElement('div');
    (result.current.containerRef as React.RefObject<HTMLDivElement>).current = div;

    const img = document.createElement('img');
    Object.defineProperty(img, 'complete', { value: true });
    Object.defineProperty(img, 'naturalWidth', { value: 1200 });
    Object.defineProperty(img, 'naturalHeight', { value: 800 });
    (result.current.imgRef as React.RefObject<HTMLImageElement>).current = img;

    rerender({ currentCrop: mockCrop });

    act(() => {
      resizeCallback([{ contentRect: { width: 400, height: 300 } } as ResizeObserverEntry], {} as ResizeObserver);
    });

    expect(result.current.croppedImgStyle.position).toBe('absolute');
    expect(result.current.croppedImgStyle.objectFit).toBeUndefined();
  });
});
