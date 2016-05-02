import React from 'react';

// on each request, it renders on different engines, global variables are OK here.
let tokenName;
let tokenValue;

export default function AntiForgeryToken() {
  if (!tokenName) {
    throw Error('CSRF is not enabled on this request.');
  }

  return React.createElement('input', {
    type: 'hidden',
    name: tokenName,
    value: tokenValue,
  });
}

AntiForgeryToken.setToken = (token = {}) => {
  tokenName = token.key;
  tokenValue = token.value;
};
