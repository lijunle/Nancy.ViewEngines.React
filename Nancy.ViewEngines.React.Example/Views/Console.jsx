import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },

  render() {
    if (typeof document === 'undefined') {
      // output something only during server render
      console.log('Log something during server render will be restored for client.')
      console.warn('Warn and other console methods work fine too.');
    }

    return (
      <div>
        <div>Open developer tool to check console output.</div>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  },

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
    console.log(value);
  }
});
