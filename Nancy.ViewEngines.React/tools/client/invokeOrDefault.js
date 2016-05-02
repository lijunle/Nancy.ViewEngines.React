export default function invokeOrDefault(fn, defaultValue) {
  return typeof fn === 'function' ? fn() : defaultValue;
}
