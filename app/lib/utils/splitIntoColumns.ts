export const splitIntoColumns = (items: any[], columnsCount: number) => {
  const columns: any[][] = Array.from({ length: columnsCount }, () => []);
  const rowsCount = Math.ceil(items.length / columnsCount);

  for (let row = 0; row < rowsCount; row++) {
    const rowItems = items.slice(row * columnsCount, (row + 1) * columnsCount);

    if (rowItems.length === columnsCount) {
      [...rowItems].reverse().forEach((item, colIndex) => {
        columns[colIndex][row] = item;
      });
    } else {
      const emptySlots = columnsCount - rowItems.length;
      rowItems.forEach((item, i) => {
        columns[emptySlots + i][row] = item;
      });
    }
  }

  return columns;
};
