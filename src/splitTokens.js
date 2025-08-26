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
function splitTokens(str) {
  // 改行コードを統一
  let normalized = str.replace(/\r\n?/g, '\n');
  // タブと全角スペースを半角スペースに統一
  normalized = normalized.replace(/\t/g, ' ').replace(/\u3000/g, ' ');
  // 前後の空白を除去
  const trimmed = normalized.trim();

  // 区切り文字（カンマ or 半角スペース）正規表現
  const delimiter = /[ ,]+/;

  // 数値変換関数
  const toValue = (s) => (/^-?\d+$/.test(s) ? Number(s) : s);

  // 改行の有無を判定
  if (!/\n/.test(trimmed)) {
    // 区切り文字（カンマ、半角スペース）で分割、数値変換
    const tokens = trimmed.split(delimiter).filter(Boolean).map(toValue);

    if (tokens.length === 1) {
      return tokens[0]; // ① 単一値のデータ（改行は無く、区切り文字がないデータ）
    } else {
      return tokens; //  ② 一行のデータ（改行は無く、1行の中で区切り文字があるデータ）
    }
  }

  // ③ 複数行のデータ
  return trimmed
    .split('\n') //改行で分割
    .filter(Boolean) //空行を削除
    .map(
      (line) =>
        line
          .split(delimiter) //行内を区切り文字（カンマ、半角スペース）で分割
          .filter(Boolean) //空行を削除
          .map(toValue) //数値変換
    );
}

module.exports = splitTokens;
