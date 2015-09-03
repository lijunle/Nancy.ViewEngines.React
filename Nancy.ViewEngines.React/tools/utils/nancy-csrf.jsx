import React from 'react';

// on each request, it renders on different engines, global variables are OK here.
let csrfName;
let csrfValue;

export default React.createClass({
  statics: {
    setToken(token) {
      const csrfToken = token || {};
      csrfName = csrfToken.key;
      csrfValue = csrfToken.value;
    },
  },

  render() {
    if (!csrfName) {
      throw Error('CSRF is not enabled on this request.');
    }

    return <input type="hidden" name={csrfName} value={csrfValue} />;
  },
});
