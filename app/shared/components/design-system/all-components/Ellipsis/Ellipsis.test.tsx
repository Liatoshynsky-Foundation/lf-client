import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { Ellipsis } from './Ellipsis';

let roCallback: ResizeObserverCallback | null = null;
let originalResizeObserver: typeof ResizeObserver;

const createResizeObserverEntry = (target: Element): ResizeObserverEntry => {
  const contentRect: DOMRectReadOnly = {
    x: 0,
    y: 0,
    width: (target as HTMLElement).clientWidth ?? 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => ({})
  };

  const size: ResizeObserverSize = { inlineSize: contentRect.width, blockSize: contentRect.height };

  return {
    target,
    contentRect,
    borderBoxSize: [size],
    contentBoxSize: [size],
    devicePixelContentBoxSize: [size]
  };
};

jest.mock('../tooltip/Tooltip', () => ({
  __esModule: true,
  default: ({
    children,
    disableHoverListener,
    disableFocusListener,
    disableTouchListener,
    title
  }: {
    children: React.ReactNode;
    disableHoverListener?: boolean;
    disableFocusListener?: boolean;
    disableTouchListener?: boolean;
    title?: string;
  }) => (
    <div
      data-testid="tooltip"
      data-disable-hover={String(disableHoverListener)}
      data-disable-focus={String(disableFocusListener)}
      data-disable-touch={String(disableTouchListener)}
      data-title={title}
    >
      {children}
    </div>
  )
}));

const setWidths = (el: HTMLElement, client: number, scroll: number) => {
  Object.defineProperty(el, 'clientWidth', { configurable: true, value: client });
  Object.defineProperty(el, 'scrollWidth', { configurable: true, value: scroll });
};

beforeAll(() => {
  originalResizeObserver = global.ResizeObserver;
  global.ResizeObserver = function (cb: ResizeObserverCallback) {
    roCallback = cb;
    return {
      observe: () => {},
      unobserve: () => {},
      disconnect: () => {}
    } as unknown as ResizeObserver;
  } as unknown as typeof ResizeObserver;
});

afterAll(() => {
  global.ResizeObserver = originalResizeObserver;
});

describe('Ellipsis', () => {
  it('should render text', () => {
    render(<Ellipsis text="Hello world" />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('should enable tooltip when text overflows and showTooltip is true', async () => {
    render(<Ellipsis text="Overflowing text" />);
    const textEl = screen.getByText('Overflowing text');
    const wrapper = textEl.parentElement as HTMLElement;
    setWidths(textEl, 100, 200);
    setWidths(wrapper, 100, 200);

    await act(async () => {
      const entry = createResizeObserverEntry(textEl);
      roCallback?.([entry], {} as unknown as ResizeObserver);
    });

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toHaveAttribute('data-disable-hover', 'false');
    expect(tooltip).toHaveAttribute('data-disable-focus', 'false');
    expect(tooltip).toHaveAttribute('data-disable-touch', 'false');
    expect(tooltip).toHaveAttribute('data-title', 'Overflowing text');
  });

  it('should disable tooltip when text does not overflow', async () => {
    render(<Ellipsis text="Short" />);
    const textEl = screen.getByText('Short');
    const wrapper = textEl.parentElement as HTMLElement;
    setWidths(textEl, 200, 100);
    setWidths(wrapper, 200, 100);

    await act(async () => {
      const entry = createResizeObserverEntry(textEl);
      roCallback?.([entry], {} as unknown as ResizeObserver);
    });

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toHaveAttribute('data-disable-hover', 'true');
    expect(tooltip).toHaveAttribute('data-disable-focus', 'true');
    expect(tooltip).toHaveAttribute('data-disable-touch', 'true');
  });

  it('should disable tooltip when showTooltip is false even if overflowing', async () => {
    render(<Ellipsis text="Overflow but disabled" showTooltip={false} />);
    const textEl = screen.getByText('Overflow but disabled');
    const wrapper = textEl.parentElement as HTMLElement;
    setWidths(textEl, 100, 200);
    setWidths(wrapper, 100, 200);

    await act(async () => {
      const entry = createResizeObserverEntry(textEl);
      roCallback?.([entry], {} as unknown as ResizeObserver);
    });

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toHaveAttribute('data-disable-hover', 'true');
    expect(tooltip).toHaveAttribute('data-disable-focus', 'true');
    expect(tooltip).toHaveAttribute('data-disable-touch', 'true');
  });

  it('should apply maxWidth to wrapper box', () => {
    render(<Ellipsis text="With max width" maxWidth={123} />);
    const textEl = screen.getByText('With max width');
    const wrapper = textEl.parentElement as HTMLElement;
    expect(wrapper).toHaveStyle({ maxWidth: '123px' });
  });
});
