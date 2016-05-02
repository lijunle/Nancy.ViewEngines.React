import React from 'react';
import Layout from './TitleLayout';

export default class Title extends React.Component {
  static layout = Layout

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    updateTitle: React.PropTypes.func.isRequired,
  }

  getInitialState() {
    return {
      title: this.props.title,
    };
  }

  handleChange(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  handleUpdate() {
    this.props.updateTitle(this.state.title);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="New Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input type="button" value="Update" onClick={this.handleUpdate} />
      </div>
    );
  }
}
