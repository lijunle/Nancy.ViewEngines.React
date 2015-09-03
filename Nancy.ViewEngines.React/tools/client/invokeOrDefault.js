export default (fn, defaultValue) =>
  typeof fn === 'function' ? fn() : defaultValue;
