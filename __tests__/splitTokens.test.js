import splitTokens from '../src/splitTokens.js';

describe('splitTokens', () => {
  describe('① 単一値のデータ（改行は無く、区切り文字がないデータ）', () => {
    const testData = [
      { title: '一文字："a"→"a"', input: 'a', validation: 'a' },
      { title: '複数字："ab"→"ab"', input: 'ab', validation: 'ab' },
      { title: '一文字,末尾に改行："a\n"→"a"', input: 'a\n', validation: 'a' },
      { title: '複数字,末尾に改行："ab\n"→"ab"', input: 'ab\n', validation: 'ab' },
      { title: '一文字（数値）："1"→1', input: '1', validation: 1 },
      { title: '複数字（数値）："12"→12', input: '12', validation: 12 },
      { title: '一文字（数値）,末尾に改行："1\n"→12', input: '1\n', validation: 1 },
      { title: '複数字（数値）,末尾に改行："12\n"→12', input: '12\n', validation: 12 },
    ];

    testData.forEach(({ title, input, validation }) => {
      test(title, () => {
        expect(splitTokens(input)).toBe(validation);
      });
    });
  });

  describe('② 一行のデータ（改行は無く、1行の中で区切り文字があるデータ）', () => {
    const testData = [
      {
        title: '半角スペース区切り："a b c"→["a", "b", "c"]',
        input: 'a b c',
        validation: ['a', 'b', 'c'],
      },
      {
        title: '全角スペース区切り："a　b　c"→["a", "b", "c"]',
        input: 'a　b　c',
        validation: ['a', 'b', 'c'],
      },
      {
        title: 'カンマ区切り："a,b,c"→["a", "b", "c"]',
        input: 'a,b,c',
        validation: ['a', 'b', 'c'],
      },
      {
        title: '混在区切り："a, b　c"→["a", "b", "c"]',
        input: 'a, b　c',
        validation: ['a', 'b', 'c'],
      },
      {
        title: '半角スペース区切り（数値）："1 2 3"→[1, 2, 3] ',
        input: '1 2 3',
        validation: [1, 2, 3],
      },
      {
        title: '全角スペース区切り（数値）："1　2　3"→[1, 2, 3] ',
        input: '1　2　3',
        validation: [1, 2, 3],
      },
      { title: 'カンマ区切り（数値）："1,2,3"→[1, 2, 3] ', input: '1,2,3', validation: [1, 2, 3] },
      {
        title: '混在区切り（数値）："1, 2　3"→[1, 2, 3] ',
        input: '1, 2　3',
        validation: [1, 2, 3],
      },
    ];

    testData.forEach(({ title, input, validation }) => {
      test(title, () => {
        expect(splitTokens(input)).toEqual(validation);
      });
    });
  });

  describe('③ 複数行のデータ', () => {
    const testData = [
      { title: '単一値,一文字："a\nb"→[["a"], ["b"]] ', input: 'a\nb', validation: [['a'], ['b']] },
      {
        title: '単一値,複数文字："ab\ncd"→[["ab"], ["cd"]]',
        input: 'ab\ncd',
        validation: [['ab'], ['cd']],
      },
      {
        title: 'カンマ区切り："a,b,c\nd,e,f"→[["a", "b", "c"],["d", "e", "f"]]',
        input: 'a,b,c\nd,e,f',
        validation: [
          ['a', 'b', 'c'],
          ['d', 'e', 'f'],
        ],
      },
      {
        title: '半角スペース区切り："a b c\nd e f"→[["a", "b", "c"],["d", "e", "f"]]',
        input: 'a b c\nd e f',
        validation: [
          ['a', 'b', 'c'],
          ['d', 'e', 'f'],
        ],
      },
      {
        title: '全角スペース区切り："a　b　c\nd　e　f"→[["a", "b", "c"],["d", "e", "f"]]',
        input: 'a　b　c\nd　e　f',
        validation: [
          ['a', 'b', 'c'],
          ['d', 'e', 'f'],
        ],
      },
      {
        title: '混在区切り："a, b　c\nd, e　f"→[["a", "b", "c"],["d", "e", "f"]]',
        input: 'a, b　c\nd, e　f',
        validation: [
          ['a', 'b', 'c'],
          ['d', 'e', 'f'],
        ],
      },
      { title: '単一値（数値）："1\n2"→[[1], [2]]', input: '1\n2', validation: [[1], [2]] },
      {
        title: '単一値,複数文字（数値）："12\n34"→[[12], [34]]',
        input: '12\n34',
        validation: [[12], [34]],
      },
      {
        title: 'カンマ区切り（数値）："1 2 3\n4 5 6"→[[1, 2, 3],[4, 5, 6]]',
        input: '1 2 3\n4 5 6',
        validation: [
          [1, 2, 3],
          [4, 5, 6],
        ],
      },
      {
        title: '半角スペース区切り（数値）："1 2 3\n4 5 6"→[[1, 2, 3],[4, 5, 6]]',
        input: '1 2 3\n4 5 6',
        validation: [
          [1, 2, 3],
          [4, 5, 6],
        ],
      },
      {
        title: '全角スペース区切り（数値）："1　2　3\n4　5　6"→[[1, 2, 3],[4, 5, 6]]',
        input: '1　2　3\n4　5　6',
        validation: [
          [1, 2, 3],
          [4, 5, 6],
        ],
      },
      {
        title: '混在区切り（数値）："1,2,3\n4,5,6"→[[1, 2, 3],[4, 5, 6]]',
        input: '1,2,3\n4,5,6',
        validation: [
          [1, 2, 3],
          [4, 5, 6],
        ],
      },
    ];

    testData.forEach(({ title, input, validation }) => {
      test(title, () => {
        expect(splitTokens(input)).toEqual(validation);
      });
    });
  });

  describe('④ 競プロ特有の多様な入力パターン', () => {
    const testData = [
      {
        title: '途中に空行がある複数行入力',
        input: '1 2 3\n\n4 5 6',
        validation: [
          [1, 2, 3],
          [4, 5, 6],
        ],
      },
      {
        title: '区切り文字が連続（スペース2個）',
        input: '1  2  3',
        validation: [1, 2, 3],
      },
      {
        title: '区切り文字が連続（カンマ＋スペース）',
        input: 'a,  b,  c',
        validation: ['a', 'b', 'c'],
      },
      {
        title: '先頭と末尾に余計な空白と改行',
        input: '   7 8 9   \n',
        validation: [7, 8, 9],
      },
      {
        title: '負の整数を含む',
        input: '-1 -2 -3',
        validation: [-1, -2, -3],
      },
      {
        title: '混在型（数値と文字列）',
        input: '10 apple 20 banana',
        validation: [10, 'apple', 20, 'banana'],
      },
      {
        title: 'Windows改行（\\r\\n）',
        input: 'x y z\r\np q r',
        validation: [
          ['x', 'y', 'z'],
          ['p', 'q', 'r'],
        ],
      },
      {
        title: 'タブ区切り（\\t）',
        input: '1\t2\t3',
        validation: [1, 2, 3],
      },
      {
        title: '改行のみの行を含む',
        input: 'a b c\n\nx y z',
        validation: [
          ['a', 'b', 'c'],
          ['x', 'y', 'z'],
        ],
      },
    ];

    testData.forEach(({ title, input, validation }) => {
      test(title, () => {
        expect(splitTokens(input)).toEqual(validation);
      });
    });
  });
});
