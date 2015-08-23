import React from 'react';

export default React.createClass({
  propTypes: {
    view: React.PropTypes.func.isRequired, // React component constructor
    model: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      title: this.props.model.title || 'Example Title',
      styles: this.props.model.styles || []
    }
  },

  getTitle() {
    return this.state.title;
  },

  getStyles() {
    return this.state.styles;
  },

  render() {
    return (
      <this.props.view {...this.props.model}
        updateTitle={this.updateTitle}
        updateStyles={this.updateStyles} />
    );
  },

  updateTitle(title) {
    this.setState({ title });
  },

  updateStyles(styles) {
    this.setState({ styles })
  }
});
