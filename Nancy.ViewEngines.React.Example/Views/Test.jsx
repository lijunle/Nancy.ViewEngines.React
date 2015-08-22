import React from 'react';

export default React.createClass({
  render() {
    return <div>Text: <code>{this.props.text}</code></div>;
  }
});
