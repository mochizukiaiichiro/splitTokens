import toValue from './toValue.js';

export default function parseSingleLine(str, delimiter) {
  const tokens = str.split(delimiter).filter(Boolean).map(toValue);
  return tokens.length === 1 ? tokens[0] : tokens;
}
