import React from 'react';
import moment from 'moment';

export default class Moment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: null,
    };
  }

  componentDidMount() {
    this.updateCurrentTime();
    setInterval(this.updateCurrentTime, 1000);
  }

  updateCurrentTime = () => {
    this.setState({
      currentTime: moment().format(),
    });
  }

  render() {
    return <div>Current time: <code>{this.state.currentTime}</code></div>;
  }
}
