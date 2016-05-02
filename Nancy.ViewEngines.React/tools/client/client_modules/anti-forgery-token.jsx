var React = require('react');

// on each request, it renders on different engines, global variables are OK here.
var tokenName;
var tokenValue;

function AntiForgeryToken() {
  if (!tokenName) {
    throw Error('CSRF is not enabled on this request.');
  }

  return React.createElement('input', {
    type: 'hidden',
    name: tokenName,
    value: tokenValue,
  });
}

AntiForgeryToken.setToken = function setToken(token) {
  var t = token || {};
  tokenName = t.key;
  tokenValue = t.value;
};

module.exports = AntiForgeryToken;
