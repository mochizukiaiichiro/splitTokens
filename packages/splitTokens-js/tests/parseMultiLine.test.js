import parseMultiLine from '../src/parseMultiLine.js';

describe('parseMultiLine', () => {
  const delimiter = /[ ,]+/;

  test('複数行の文字列を2次元配列化', () => {
    const input = 'a b c\nd e f';
    expect(parseMultiLine(input, delimiter)).toEqual([
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ]);
  });

  test('数値変換あり', () => {
    const input = '1 2 3\n4 5 6';
    expect(parseMultiLine(input, delimiter)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  test('空行は無視', () => {
    const input = '1 2 3\n\n4 5 6';
    expect(parseMultiLine(input, delimiter)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });
});
