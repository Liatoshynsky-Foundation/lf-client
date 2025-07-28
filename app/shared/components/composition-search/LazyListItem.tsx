import React, { memo, ReactNode, useCallback } from 'react';
import { AutoSizer, List as VirtualizedList, ListRowProps } from 'react-virtualized';

interface VirtualizedListboxProps {
  children: ReactNode[];
}

const Row = memo(({ style, children }: { style: React.CSSProperties; children: ReactNode }) => {
  return <div style={style}>{children}</div>;
});
Row.displayName = 'Row';
export const VirtualizedListbox = React.forwardRef<HTMLDivElement, VirtualizedListboxProps>(
  function VirtualizedListbox(props, ref) {
    const { children, ...other } = props;
    const itemCount = React.Children.count(children);
    const itemSize = 64;

    const rowRenderer = useCallback(
      ({ index, key, style }: ListRowProps) => {
        return (
          <Row key={key} style={style}>
            {children[index]}
          </Row>
        );
      },
      [children]
    );

    return (
      <div ref={ref} {...other}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualizedList
              width={width}
              height={Math.min(8, itemCount) * itemSize}
              rowHeight={itemSize}
              rowCount={itemCount}
              overscanRowCount={0}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
);
