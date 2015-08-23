import React from 'react';

export default React.createClass({
  render() {
    return <div>Home: <code>{this.props.text}</code></div>;
  }
});
