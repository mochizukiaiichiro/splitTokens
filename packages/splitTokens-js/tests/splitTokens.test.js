import splitTokens from '../src/splitTokens.js';
import single from './fixtures/single.json' with { type: 'json' };
import singleDefault from './fixtures/singleDefault.json' with { type: 'json' };
import oneLine from './fixtures/oneLine.json' with { type: 'json' };
import multiLines from './fixtures/multiLines.json' with { type: 'json' };
import misc from './fixtures/misc.json' with { type: 'json' };

describe('splitTokens', () => {
  describe('【1-2】単一値（改行無し、区切り文字がないデータ、第二引数,{ primitive:true }（戻り値がプリミティブ型））', () => {
    for (const { title, input, output } of single) {
      test(title, () => {
        expect(splitTokens(input, { primitive:true })).toBe(output);
      });
    }
  });

  describe('【1-2】単一値（改行無し、区切り文字がないデータ、第二引数,default（戻り値が配列型））', () => {
    for (const { title, input, output } of singleDefault) {
      test(title, () => {
        expect(splitTokens(input)).toEqual(output);
      });
    }
  });

  describe('【2-1】一行（改行無し、1行の中で区切り文字があるデータ）、第二引数,{ primitive:true }', () => {
    for (const { title, input, output } of oneLine) {
      test(title, () => {
        expect(splitTokens(input, { primitive:true })).toEqual(output);
      });
    };
  });
  
  describe('【2-2】一行（改行無し、1行の中で区切り文字があるデータ）、第二引数,default', () => {
    for (const { title, input, output } of oneLine) {
      test(title, () => {
        expect(splitTokens(input)).toEqual(output);
      });
    };
  });

  describe('【3-1】複数行、第二引数,{ primitive:true }', () => {
    for (const { title, input, output } of multiLines) {
      test(title, () => {
        expect(splitTokens(input, { primitive:true })).toEqual(output);
      });
    };
  });
  
  describe('【3-2】複数行、第二引数,default', () => {
    for (const { title, input, output } of multiLines) {
      test(title, () => {
        expect(splitTokens(input)).toEqual(output);
      });
    };
  });

  describe('【4-1】競プロ特有の多様な入力パターン、第二引数,{ primitive:true }', () => {
    for (const { title, input, output } of misc) {
      test(title, () => {
        expect(splitTokens(input, { primitive:true })).toEqual(output);
      });
    };
  });
  
  describe('【4-2】競プロ特有の多様な入力パターン、第二引数,default', () => {
    for (const { title, input, output } of misc) {
      test(title, () => {
        expect(splitTokens(input)).toEqual(output);
      });
    };
  });
});
