export default function normalizeInput(str) {
  return str
    .replace(/\r\n?/g, '\n') // 改行統一
    .replace(/\t/g, ' ') // タブ → 半角スペース
    .replace(/\u3000/g, ' ') // 全角スペース → 半角
    .trim(); // 前後空白除去
}
