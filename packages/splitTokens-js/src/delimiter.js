/**
 * 区切り文字の正規表現
 * - 半角スペース, カンマ, それらの連続を区切りとする
 * - 全角スペースは normalizeInput で半角に正規化される想定
 * @constant
 * @type {RegExp}
 */
export const DELIMITER = /[ ,]+/;
