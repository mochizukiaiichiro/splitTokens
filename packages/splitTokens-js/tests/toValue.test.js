import toValue from '../src/toValue.js';

describe('toValue', () => {
  test('整数文字列を数値に変換', () => {
    expect(toValue('123')).toBe(123);
    expect(toValue('-45')).toBe(-45);
  });

  test('少数文字列を数値に変換', () => {
    expect(toValue('12.5')).toBe(12.5);
  });

  test('数値以外は文字列のまま', () => {
    expect(toValue('apple')).toBe('apple');
  });
});
