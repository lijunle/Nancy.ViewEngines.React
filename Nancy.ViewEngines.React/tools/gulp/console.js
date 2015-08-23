// Avoid `console` errors in environments that lack a console.
// Inspired from https://github.com/matthewhudson/console/blob/master/console.js

const inServer = typeof document === 'undefined';
const logger = inServer ? {} : window.console;
const logs = {};

[
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'exception', 'group',
  'groupCollapsed', 'groupEnd', 'markTimeline', 'profile', 'profileEnd',
  'table', 'time', 'timeEnd', 'timeStamp'
].forEach(method => {
  logger[method] = logger[method] || () => {};
});

// restore the log arguements to redirect information for client
[
  'log', 'dir', 'trace', 'debug', 'info', 'warn', 'error'
].forEach(method => {
  logger[method] = logger[method] || ((...args) => {
    const stacktrace = (new Error()).stack;
    logs[method] = logs[method] || [];
    logs[method].push([stacktrace].concat(args));
  });
});

function formatCode(method, stacktrace, args) {
  const argsCode = args.map(arg => JSON.stringify(arg)).join(', ');
  const stacktraceCode = JSON.stringify(stacktrace.replace(/^Error/, '\nStacktrace'));
  const code = `console.${method}(${argsCode}, ${stacktraceCode});`;
  return code;
}

if (inServer) {
  // restore the logs during server render back to client
  logger.restore = () => {
    return Object.keys(logs).map(method => {
      return logs[method].map(([stacktrace, ...args]) => {
        return formatCode(method, stacktrace, args);
      }).join('');
    }).join('');
  };
}

export default logger; // as console
