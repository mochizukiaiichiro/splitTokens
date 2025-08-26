// jest.config.js
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node', // Node.js 環境で実行
  verbose: true, // 各テストケースの詳細を表示
  collectCoverage: true, // カバレッジ計測を有効化
  collectCoverageFrom: [
    '**/splitTokens.js', // カバレッジ対象ファイル
    '!**/node_modules/**',
  ],
  testMatch: [
    '**/__tests__/**/*.test.js', // __tests__ ディレクトリ配下
  ],
};
