import React from 'react';
import Csrf from 'nancy-csrf';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
  },

  render() {
    return (
      <form method="post">
        <div>{this.props.title}</div>
        <Csrf />
        <input type="text" name="title" />
        <input type="submit" value="Submit" />
      </form>
    );
  },
});
