const splitTokens = require('./src/splitTokens');

// 標準入力を読み取り、splitTokensでパース
const fs = require('fs');
const input = splitTokens(fs.readFileSync(0, 'utf8'));

console.log(input);
