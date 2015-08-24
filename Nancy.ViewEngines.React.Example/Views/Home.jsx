import React from 'react';

export default React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
  },

  render() {
    return <div>Home: <code>{this.props.text}</code></div>;
  },
});
