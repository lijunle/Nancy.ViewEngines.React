// Avoid `console` errors in environments that lack a console.
// Inspired from https://github.com/matthewhudson/console/blob/master/console.js

var inServer = typeof document === 'undefined';
var logger = inServer ? {} : window.console;
var logs = [];

function noop() {}

[
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'exception', 'group',
  'groupCollapsed', 'groupEnd', 'markTimeline', 'profile', 'profileEnd',
  'table', 'time', 'timeEnd', 'timeStamp',
].forEach(function mockNoop(method) {
  logger[method] = logger[method] || noop;
});

// restore the log arguements to redirect information for client
[
  'log', 'dir', 'trace', 'debug', 'info', 'warn', 'error',
].forEach(function mockRedirect(method) {
  logger[method] = logger[method] || function store() {
    var args = [].slice(arguments);
    var stacktrace = (new Error()).stack.replace(/^Error/, '\nStacktrace');
    logs.push([method, stacktrace, args]);
  };
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

function formatCode(log) {
  var method = log[0];
  var stacktrace = log[1];
  var args = log[2];
  var argsCode = args.map(stringify).join(', ');
  var stacktraceCode = JSON.stringify(stacktrace);
  var code = 'console.' + method + '(' + argsCode + ',' + stacktraceCode + ');';
  return code;
}

if (inServer) {
  // restore the logs during server render back to client
  logger.restore = function restore() {
    logs.map(formatCode).join('');
  };
}

module.exports = logger; // as console
