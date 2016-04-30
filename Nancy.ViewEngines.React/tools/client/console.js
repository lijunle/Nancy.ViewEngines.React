// Avoid `console` errors in environments that lack a console.
// Inspired from https://github.com/matthewhudson/console/blob/master/console.js

const inServer = typeof document === 'undefined';
const logger = inServer ? {} : window.console;
const logs = [];

[
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'exception', 'group',
  'groupCollapsed', 'groupEnd', 'markTimeline', 'profile', 'profileEnd',
  'table', 'time', 'timeEnd', 'timeStamp',
].forEach(method => {
  logger[method] = logger[method] || () => {};
});

// restore the log arguements to redirect information for client
[
  'log', 'dir', 'trace', 'debug', 'info', 'warn', 'error',
].forEach(method => {
  logger[method] = logger[method] || ((...args) => {
    const stacktrace = (new Error()).stack.replace(/^Error/, '\nStacktrace');
    logs.push([method, stacktrace, args]);
  });
});

function stringify(object) {
  // JSON.stringify(undefined) returns undefined, not meets requirement
  if (object === undefined) {
    return 'undefined';
  }

  try {
    return JSON.stringify(object);
  } catch (e) {
    return JSON.stringify(object.toString());
  }
}

function formatCode([method, stacktrace, args]) {
  const argsCode = args.map(stringify).join(', ');
  const stacktraceCode = JSON.stringify(stacktrace);
  const code = `console.${method}(${argsCode}, ${stacktraceCode});`;
  return code;
}

if (inServer) {
  // restore the logs during server render back to client
  logger.restore = () => logs.map(formatCode).join('');
}

export default logger; // as console
