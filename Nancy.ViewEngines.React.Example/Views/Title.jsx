import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      title: this.props.title
    }
  },

  render() {
    return (
      <div>
        <input type="text" placeholder="New Title" value={this.state.title} onChange={this.handleChange} />
        <input type="button" value="Update" onClick={this.handleUpdate} />
      </div>
    );
  },

  handleChange(event) {
    const title = event.target.value;
    this.setState({ title });
  },

  handleUpdate() {
    this.props.updateTitle(this.state.title);
  }
});
