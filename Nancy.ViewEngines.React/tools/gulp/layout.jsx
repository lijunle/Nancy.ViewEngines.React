import React from 'react';

export default React.createClass({
  propTypes: {
    view: React.PropTypes.func.isRequired, // React component constructor
    model: React.PropTypes.object.isRequired,
  },

  getTitle() {
    return this.props.model.title || '';
  },

  getStyles() {
    return this.props.model.styles || [];
  },

  render() {
    return <this.props.view {...this.props.model} />;
  },
});
