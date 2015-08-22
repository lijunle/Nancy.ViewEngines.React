// Avoid `console` errors in environments that lack a console.
// Inspired from https://github.com/matthewhudson/console/blob/master/console.js

const logger = {};
const logs = {};

[
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'exception', 'group',
  'groupCollapsed', 'groupEnd', 'markTimeline', 'profile', 'profileEnd',
  'table', 'time', 'timeEnd', 'timeStamp'
].forEach(method => {
  logger[method] = () => {};
});

// restore the log arguements to redirect information for client
[
  'log', 'dir', 'trace', 'debug', 'info', 'warn', 'error'
].forEach(method => {
  logger[method] = (...args) => {
    const stacktrace = (new Error()).stack;
    logs[method] = logs[method] || [];
    logs[method].push([stacktrace].concat(args));
  };
});

function formatCode(method, stacktrace, args) {
  const argsCode = args.map(arg => JSON.stringify(arg)).join(', ');
  const stacktraceCode = JSON.stringify(stacktrace.replace(/^Error/, '\nStacktrace'));
  const code = `console.${method}(${argsCode}, ${stacktraceCode});`;
  return code;
}

// retrieve stored log arguements to show information back to client
logger.restore = () => {
  return Object.keys(logs).map(method => {
    return logs[method].map(([stacktrace, ...args]) => {
      return formatCode(method, stacktrace, args);
    }).join('');
  }).join('');
};

export default logger; // as console
