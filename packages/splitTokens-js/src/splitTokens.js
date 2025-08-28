import normalizeInput from './normalizeInput.js';
import parseMultiLine from './parseMultiLine.js';
import parseSingleLine from './parseSingleLine.js';

/**
 * splitTokens
 * 文字列を単一値・1次元配列・2次元配列に変換するユーティリティ
 * - 半角/全角スペース、タブ、カンマ、改行を区切りとして認識
 * - 改行コードは事前に \n に正規化
 * - 整数は自動的に Number 型に変換
 *
 * @param {string} str 入力文字列
 * @returns {string|number|Array} 変換後の値
 */
export default function splitTokens(str) {
  const normalized = normalizeInput(str);
  const delimiter = /[ ,]+/; // 区切り文字（カンマ or 半角スペース）正規表現
  return /\n/.test(normalized)
    ? parseMultiLine(normalized, delimiter)
    : parseSingleLine(normalized, delimiter);
}
