import { render, screen } from '@testing-library/react';
import React from 'react';

import { VirtualizedListbox } from './LazyListItem';

jest.mock('react-virtualized', () => {
  return {
    AutoSizer: ({ children }: any) => <div>{children({ width: 100 })}</div>,
    List: ({ rowCount, rowRenderer }: any) => (
      <div>{Array.from({ length: rowCount }).map((_, index) => rowRenderer({ index, key: index, style: {} }))}</div>
    )
  };
});

describe('VirtualizedListbox', () => {
  test('renders children inside virtualized list', () => {
    render(
      <VirtualizedListbox>
        {[
          <div data-testid="item-1" key="1">
            Item 1
          </div>,
          <div data-testid="item-2" key="2">
            Item 2
          </div>
        ]}
      </VirtualizedListbox>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('forwards ref to container div', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<VirtualizedListbox ref={ref}>{[<div key="1">Item</div>]}</VirtualizedListbox>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
