# splitTokens.js — 汎用入力パーサ for Node.js

競技プログラミング（AtCoder / paiza など）や CLI ツール向けの、  
**半角/全角スペース、タブ、カンマ、改行を自動判定してパースする汎用関数** です。

## 特徴

- 半角/全角スペース、タブ、カンマ、改行を区切りとして認識
- 改行コードは事前に \n に正規化
- 整数は自動的に Number 型に変換
  - **注意**: `001` のようなゼロ埋め整数は `Number` 型に変換される際に `1` になります

---

## インストール / セットアップ

この関数は外部依存なしで使えます。  
`splitTokens.js` をプロジェクトやブラウザの実行環境にコピーするだけです。

---

## 使い方

```js
const input = splitTokens(require('fs').readFileSync(0, 'utf8'));
console.log(input);

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
```

### コマンドプロンプト（cmd.exe）の場合

```bash
type input.txt | node index.js
```

## 仕様

`splitTokens` は、入力文字列を以下のルールで変換します。

### `splitTokens` の変換ルール

| 入力例         | 出力例                           | 出力型             | 説明                                                   |
| -------------- | -------------------------------- | ------------------ | ------------------------------------------------------ |
| `12`           | `12`                             | number             | 単一の整数は数値型に変換                               |
| `001`          | `1`                              | number             | ゼロ埋め整数も数値型に変換され、先頭のゼロは削除される |
| `a`            | `"a"`                            | string             | 単一の文字列はそのまま返す                             |
| `1 2 3`        | `[1, 2, 3]`                      | number[]           | 半角スペース区切りの整数列                             |
| `a b c`        | `["a", "b", "c"]`                | string[]           | 半角スペース区切りの文字列列                           |
| `1,2,3`        | `[1, 2, 3]`                      | number[]           | カンマ区切り                                           |
| `1　2　3`      | `[1, 2, 3]`                      | number[]           | 全角スペース区切り                                     |
| `1\t2\t3`      | `[1, 2, 3]`                      | number[]           | タブ区切り（`\t`）                                     |
| `1 2 3\n4 5 6` | `[[1, 2, 3], [4, 5, 6]]`         | number[][]         | 改行で行を分割し、各行を配列化                         |
| `a,b,c\nd,e,f` | `[["a","b","c"], ["d","e","f"]]` | string[][]         | カンマ区切り＋改行の複合パターン                       |
| `-1 -2 -3`     | `[-1, -2, -3]`                   | number[]           | 負の整数も数値型に変換                                 |
| `10 apple 20`  | `[10, "apple", 20]`              | (number\|string)[] | 数値と文字列が混在する場合はそれぞれ適切な型に変換     |

---

## ライセンス

MIT License
