function invokeOrDefault(fn, defaultValue) {
  return typeof fn === 'function' ? fn() : defaultValue;
}

module.exports = invokeOrDefault;
