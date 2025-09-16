import { splitIntoColumns } from './splitIntoColumns';

describe('splitIntoColumns', () => {
  it('should render all the elements in reversed order', () => {
    const items = [1, 2, 3];
    const reversedArr = splitIntoColumns(items, 3);
    expect(reversedArr).toEqual([[3], [2], [1]]);
  });

  it('should render several rows correctly', () => {
    const items = [1, 2, 3, 4, 5, 6];
    const reversedArr = splitIntoColumns(items, 3);
    expect(reversedArr).toEqual([
      [3, 6],
      [2, 5],
      [1, 4]
    ]);
  });

  it('should align elements to the right if the row is not full', () => {
    const items = [1, 2, 3, 4, 5];
    const reversedArr = splitIntoColumns(items, 3);
    expect(reversedArr).toEqual([[3], [2, 4], [1, 5]]);
  });
});
