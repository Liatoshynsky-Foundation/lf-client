export type ColumnWidths = Record<string, string | number>;

export type CollapsibleGroupColumnMeta<T> = {
  isGroupLabelColumn?: boolean;
  groupLabelContent?: React.ReactNode;
  groupLabelContentFactory?: (groupItems: T[]) => React.ReactNode;
  groupCellRenderer?: () => React.ReactNode;
};

export type RowData = {
  id: number;
  [key: string]: unknown;
};
