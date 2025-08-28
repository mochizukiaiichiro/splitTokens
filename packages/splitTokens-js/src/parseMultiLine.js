import toValue from './toValue.js';

export default function parseMultiLine(str, delimiter) {
  return str
    .split('\n')
    .filter(Boolean)
    .map((line) => line.split(delimiter).filter(Boolean).map(toValue));
}
