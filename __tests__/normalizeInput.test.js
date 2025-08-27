import normalizeInput from '../src/normalizeInput.js';

describe('normalizeInput', () => {
  test('CRLFをLFに変換', () => {
    expect(normalizeInput('a\r\nb')).toBe('a\nb');
  });
  test('タブを半角スペースに変換', () => {
    expect(normalizeInput('a\tb')).toBe('a b');
  });
  test('全角スペースを半角スペースに変換', () => {
    expect(normalizeInput('a　b')).toBe('a b');
  });
  test('前後の空白を削除', () => {
    expect(normalizeInput('  a b  ')).toBe('a b');
  });
});
