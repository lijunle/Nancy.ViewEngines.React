var React = require('react');

// TODO Convert Layout to stateless component.
var Layout = React.createClass({ // eslint-disable-line react/prefer-es6-class
  propTypes: {
    view: React.PropTypes.func.isRequired, // React component constructor
    model: React.PropTypes.object.isRequired,
  },

  statics: {
    container: 'div',
  },

  getTitle: function getTitle() {
    return this.props.model.title || '';
  },

  getStyles: function getStyles() {
    return this.props.model.styles || [];
  },

  render: function render() {
    return React.createElement(this.props.view, this.props.model);
  },
});

exports.default = Layout;
