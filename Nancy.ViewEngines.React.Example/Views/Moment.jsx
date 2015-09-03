import React from 'react';
import moment from 'moment';

export default React.createClass({
  getInitialState() {
    return {
      currentTime: null,
    };
  },

  componentDidMount() {
    this.updateCurrentTime();
    setInterval(this.updateCurrentTime, 1000);
  },

  render() {
    return <div>Current time: <code>{this.state.currentTime}</code></div>;
  },

  updateCurrentTime() {
    this.setState({
      currentTime: moment().format(),
    });
  },
});
