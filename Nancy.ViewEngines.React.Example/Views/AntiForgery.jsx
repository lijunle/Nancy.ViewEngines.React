import React from 'react';
import AntiForgeryToken from 'anti-forgery-token';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
  },

  render() {
    return (
      <form method="post">
        <div>{this.props.title}</div>
        <AntiForgeryToken />
        <input type="text" name="title" />
        <input type="submit" value="Submit" />
      </form>
    );
  },
});
