import React from 'react';

export default class StyleLatyout extends React.Component {
  static propTypes = {
    view: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      styles: this.props.model.styles,
    };
  }

  getStyles = () => this.state.styles

  updateStyles = (styles) => {
    this.setState({ styles });
  }

  render() {
    return (
      <this.props.view {...this.props.model} updateStyles={this.updateStyles} />
    );
  }
}
