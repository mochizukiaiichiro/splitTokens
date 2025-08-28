# splitTokens.js — 汎用入力パーサ for Node.js

競技プログラミング（AtCoder / paiza など）や CLI ツール、スクリプト向けの  
**半角/全角スペース、タブ、カンマ、改行の文字列を自動判定して配列にパースする汎用関数** です。

---

## 特徴

- 半角/全角スペース、タブ、カンマ、改行を区切りとして認識
- 改行コードは事前に `\n` に正規化
- 整数は自動的に Number 型に変換
  - **注意**: `001` のようなゼロ埋め整数は数値変換時に `1` になります
- オプション `{ primitive: true }` で単一値をプリミティブ型にできます
- 外部依存なし、Node.js 標準モジュールのみで動作

---

## インストール / セットアップ

外部依存はありません。  
`src/` 以下のファイルをプロジェクトにコピーするか、モジュールとしてインポートして使用します。

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

- 単一行入力 → 配列（単一値でも配列） { primitive: true } 指定時のみ、要素数 1 の場合はプリミティブ値
- 複数行入力 → 二次元配列（各行は配列）
- 各トークンは、整数文字列なら Number 型、それ以外は string 型

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
