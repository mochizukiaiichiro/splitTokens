export default function toValue(s) {
  return /^-?\d+$/.test(s) ? Number(s) : s;
}
