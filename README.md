# splitTokens.js — 汎用入力パーサ for Node.js

競技プログラミング（AtCoder / paiza など）や CLI ツール、スクリプト向けの**単一行や複数行の半角/全角スペース、タブ、カンマ、改行が混在した文字列を配列にパースする汎用関数** です。

---

## 特徴

- 半角/全角スペース、タブ、カンマ、改行で分割
- 文字列を配列に変換
  - 単一行（単一値）：1 → [ 1 ]
  - 単一行（複数値）：1 2 3 → [ 1, 2, 3 ]
  - 複数行（複数値）：1 2 3\n4 5 6 → [[1, 2, 3 ], [ 4, 5, 6]]
  - 複数行（単一値,複数値の混在）：1\n2 3 4 → [[1 ], [ 2, 3, 4]]
- オプション `{ primitive: true }` で単一値をプリミティブ型に変換
  - 単一行（単一値）：1, { primitive: true } → 1
- 数値文字列は Number 型に変換
  - **注意**: `001` のようなゼロ埋め整数は数値変換時に `1` となる
  - **注意**: `+1` のような正の符号付数値文字列は `1` となる
- 外部依存なし、Node.js 標準モジュールのみで動作

---

## インストール / セットアップ

外部依存はありません。  
`packages/splitTokens-js/src/` 以下のファイルをプロジェクトにコピーするか、モジュールとしてインポートして使用します。

---

## 使い方

### ライブラリとして利用

```js
import splitTokens from './src/splitTokens.js';
import fs from 'fs';

// デフォルト: 単一値も配列で返す
console.log(splitTokens('a')); // ['a']

// オプションで単一値をプリミティブ化
console.log(splitTokens('a', { primitive: true })); // 'a'

// CLI標準入力と組み合わせ
const data = fs.readFileSync(0, 'utf8');
const parsed = splitTokens(data, { primitive: true });
console.log(parsed);
```

### CLI として利用

```js
import splitTokens from './src/splitTokens.js';
import fs from 'fs';

const input = fs.readFileSync(0, 'utf8');
console.log(splitTokens(input));
```

### 実行例（Windows cmd.exe）

```Bash
type input.txt | node index.js
```

## 仕様

### 返却形式

- 単一行 → 一次配列に変換（オプション指定時に要素数が 1 の場合はプリミティブ値）
- 複数行 → 二次元配列に変換
- 数値文字列 → Number 型に変換

### 変換ルール例

| 入力                      | 出力例                          | 出力型             | 備考                             |
| ------------------------- | ------------------------------- | ------------------ | -------------------------------- |
| `a`                       | `['a']`                         | string[]           | 単一文字列（デフォルト配列）     |
| `a` `{ primitive: true }` | `'a'`                           | string             | 単一文字列（プリミティブ指定時） |
| `1`                       | `[1]`                           | number[]           | 単一整数（デフォルト配列）       |
| `1` `{ primitive: true }` | `1`                             | number             | 単一整数（プリミティブ指定時）   |
| `a b c`                   | `['a','b','c']`                 | string[]           | 半角スペース区切り               |
| `1,2,3`                   | `[1,2,3]`                       | number[]           | カンマ区切り                     |
| `a,b,c\nd,e,f`            | `[['a','b','c'],['d','e','f']]` | string[][]         | 複数行                           |
| `1 2 3\n4 5 6`            | `[[1,2,3],[4,5,6]]`             | number[][]         | 複数行整数                       |
| `-1 -2 -3`                | `[-1,-2,-3]`                    | number[]           | 負の整数も数値型                 |
| `10 apple 20`             | `[10,'apple',20]`               | (number\|string)[] | 数値と文字列混在                 |

---

## テスト

Jest を使用してテストしています。

```Bash
npm install
npm test
```

## ライセンス

MIT License
