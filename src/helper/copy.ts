export function copy<T>(value: T) {
  return JSON.parse(JSON.stringify(value));
}
