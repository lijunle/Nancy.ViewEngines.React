import React from 'react';
import Csrf from 'nancy-csrf';

export default React.createClass({
  render() {
    return (
      <form>
        <Csrf />
        <input type="text" />
        <input type="submit" value="Submit" />
      </form>
    );
  },
});
