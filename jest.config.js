export default {
  testEnvironment: 'node', // Node.js 環境で実行
  verbose: true, // 各テストケースの詳細を表示
  collectCoverage: true, // カバレッジ計測を有効化
  collectCoverageFrom: [
    'src/**/*.js', // カバレッジ対象ファイル
    '!**/node_modules/**',
  ],
  testMatch: [
    '**/tests/**/*.test.js', // tests ディレクトリ配下
  ],
};
