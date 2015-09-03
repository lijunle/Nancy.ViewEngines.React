import React from 'react';

export default React.createClass({
  propTypes: {
    view: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      styles: this.props.model.styles,
    };
  },

  getStyles() {
    return this.state.styles;
  },

  render() {
    return (
      <this.props.view {...this.props.model} updateStyles={this.updateStyles} />
    );
  },

  updateStyles(styles) {
    this.setState({ styles });
  },
});
