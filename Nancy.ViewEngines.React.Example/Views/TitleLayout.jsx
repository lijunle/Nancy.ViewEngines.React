import React from 'react';

export default class TitleLayout extends React.Component {
  static propTypes = {
    view: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      title: this.props.model.title,
    };
  }

  getTitle = () => this.state.title

  updateTitle = (title) => {
    this.setState({ title });
  }

  render() {
    return (
      <this.props.view {...this.props.model} updateTitle={this.updateTitle} />
    );
  }
}
