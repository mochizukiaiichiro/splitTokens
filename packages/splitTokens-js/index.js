/**
 * CLIエントリポイント
 * - 標準入力を読み取り、splitTokens でパース結果を標準出力へ出す
 * - デフォルトでは単一値も配列で出力（必要に応じて { primitive: true } を指定）
 *
 * 使用例:
 *   type input.txt | node index.js
 */
import splitTokens from './src/splitTokens.js';
import fs from 'fs';

// 標準入力を読み取り、splitTokensでパース
const input = splitTokens(fs.readFileSync(0, 'utf8'));
console.log(input);
