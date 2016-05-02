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

  updateCurrentTime() {
    this.setState({
      currentTime: moment().format(),
    });
  },

  render() {
    return <div>Current time: <code>{this.state.currentTime}</code></div>;
  },
});
