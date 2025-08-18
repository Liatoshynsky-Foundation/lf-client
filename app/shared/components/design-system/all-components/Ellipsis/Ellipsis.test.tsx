import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { Ellipsis } from './Ellipsis';

let roCallback: ResizeObserverCallback | null = null;
let originalResizeObserver: typeof ResizeObserver;

const createResizeObserverEntry = (target: Element): ResizeObserverEntry => {
  const width = (target as HTMLElement).clientWidth ?? 0;
  const contentRect: DOMRectReadOnly = {
    x: 0,
    y: 0,
    width,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => ({})
  };
  const size: ResizeObserverSize = { inlineSize: width, blockSize: 0 };
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

const triggerResize = async (target: HTMLElement) => {
  const entry = createResizeObserverEntry(target);
  await act(async () => {
    roCallback?.([entry], {} as unknown as ResizeObserver);
  });
};

const renderAndMeasure = async ({
  text,
  clientWidth,
  scrollWidth,
  showTooltip = true
}: {
  text: string;
  clientWidth: number;
  scrollWidth: number;
  showTooltip?: boolean;
}) => {
  render(<Ellipsis text={text} showTooltip={showTooltip} />);
  const textEl = screen.getByText(text);
  const wrapper = textEl.parentElement as HTMLElement;

  setWidths(textEl, clientWidth, scrollWidth);
  setWidths(wrapper, clientWidth, scrollWidth);
  await triggerResize(textEl);

  return { textEl, wrapper, tooltip: screen.getByTestId('tooltip') };
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

  it('should apply maxWidth to wrapper box', () => {
    render(<Ellipsis text="With max width" maxWidth={123} />);
    const wrapper = screen.getByText('With max width').parentElement as HTMLElement;
    expect(wrapper).toHaveStyle({ maxWidth: '123px' });
  });

  const boolCases = [
    { overflow: true, showTooltip: true },
    { overflow: false, showTooltip: true },
    { overflow: true, showTooltip: false }
  ] as const;

  const toCase = ({ overflow, showTooltip }: { overflow: boolean; showTooltip: boolean }) => ({
    name: `${overflow ? 'overflow' : 'no overflow'} & tooltip ${showTooltip ? 'on' : 'off'}`,
    text: overflow ? 'Overflowing text' : 'Short',
    client: overflow ? 100 : 200,
    scroll: overflow ? 200 : 100,
    showTooltip,
    expectEnabled: overflow && showTooltip
  });

  const cases = boolCases.map(toCase);

  test.each(cases)('$name', async ({ text, client, scroll, showTooltip, expectEnabled }) => {
    const { tooltip } = await renderAndMeasure({
      text,
      clientWidth: client,
      scrollWidth: scroll,
      showTooltip
    });

    const expected = String(!expectEnabled);
    expect(tooltip).toHaveAttribute('data-disable-hover', expected);
    expect(tooltip).toHaveAttribute('data-disable-focus', expected);
    expect(tooltip).toHaveAttribute('data-disable-touch', expected);
    expect(tooltip).toHaveAttribute('data-title', text);
  });
});
