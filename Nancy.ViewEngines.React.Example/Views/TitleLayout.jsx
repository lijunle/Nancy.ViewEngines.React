import React from 'react';

export default React.createClass({
  propTypes: {
    view: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      title: this.props.model.title,
    };
  },

  getTitle() {
    return this.state.title;
  },

  render() {
    return (
      <this.props.view {...this.props.model} updateTitle={this.updateTitle} />
    );
  },

  updateTitle(title) {
    this.setState({ title });
  },
});