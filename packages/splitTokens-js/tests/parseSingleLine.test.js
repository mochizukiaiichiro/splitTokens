import parseSingleLine from '../src/parseSingleLine.js';

describe('parseSingleLine', () => {
  const delimiter = /[ ,]+/;

  test('単一値', () => {
    expect(parseSingleLine('a', delimiter)).toEqual(['a']);
    expect(parseSingleLine('123', delimiter)).toEqual([123]);
  });

  test('複数値', () => {
    expect(parseSingleLine('a b c', delimiter)).toEqual(['a', 'b', 'c']);
    expect(parseSingleLine('1 2 3', delimiter)).toEqual([1, 2, 3]);
  });

  test('混在型', () => {
    expect(parseSingleLine('1 apple 2', delimiter)).toEqual([1, 'apple', 2]);
  });
});
