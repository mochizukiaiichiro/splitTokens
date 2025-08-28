import splitTokens from '../src/splitTokens.js';
import single from './fixtures/single.json' with { type: 'json' };
import oneLine from './fixtures/oneLine.json' with { type: 'json' };
import multiLines from './fixtures/multiLines.json' with { type: 'json' };
import misc from './fixtures/misc.json' with { type: 'json' };

describe('splitTokens', () => {
  describe('① 単一値（改行無し、区切り文字がないデータ）', () => {
    for (const { title, input, output } of single) {
      test(title, () => {
        expect(splitTokens(input)).toBe(output);
      });
    }
  });

  describe('② 一行（改行無し、1行の中で区切り文字があるデータ）', () => {
    for (const { title, input, output } of oneLine) {
      test(title, () => {
        expect(splitTokens(input)).toEqual(output);
      });
    };
  });

  describe('③ 複数行', () => {
    for (const { title, input, output } of multiLines) {
      test(title, () => {
        expect(splitTokens(input)).toEqual(output);
      });
    };
  });

  describe('④ 競プロ特有の多様な入力パターン', () => {
    for (const { title, input, output } of misc) {
      test(title, () => {
        expect(splitTokens(input)).toEqual(output);
      });
    };
  });
});
