import React from 'react';

// on each request, it renders on different engines, global variables are OK here.
let tokenName;
let tokenValue;

export default React.createClass({
  statics: {
    setToken(token = {}) {
      tokenName = token.key;
      tokenValue = token.value;
    },
  },

  render() {
    if (!tokenName) {
      throw Error('CSRF is not enabled on this request.');
    }

    return <input type="hidden" name={tokenName} value={tokenValue} />;
  },
});
