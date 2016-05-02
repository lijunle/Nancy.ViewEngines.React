/* eslint-disable react/require-render-return */

import React from 'react';

export default React.createClass({
  render() {
    throw Error('An exception is thrown in JavaScript code');
  },
});
