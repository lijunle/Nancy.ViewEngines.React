import React from 'react';

export default class Console extends React.Component {
  getInitialState() {
    return {
      value: '',
    };
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
    console.log(value); // eslint-disable-line no-console
  }

  render() {
    if (typeof document === 'undefined') {
      /* eslint-disable no-console */

      // output something only during server render
      console.log('Log something during server render will be restored for client.');
      console.warn('Warn and other console methods work fine too.');

      console.log('Output an object which cannot JSON.stringify will restore' +
        ' its `toString` function', this);
      console.log('It handles `undefined` and `null` stringify', undefined, null);

      /* eslint-enable no-console */
    }

    return (
      <div>
        <div>Open developer tool to check console output.</div>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}
