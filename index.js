import splitTokens from './src/splitTokens.js';
import fs from 'fs';

// 標準入力を読み取り、splitTokensでパース
const input = splitTokens(fs.readFileSync(0, 'utf8'));

console.log(input);
