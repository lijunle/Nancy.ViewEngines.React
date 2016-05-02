import React from 'react';

export default class Form extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
  }

  getInitialState() {
    return {
      text: this.props.text,
    };
  }

  handleChange(event) {
    const text = event.target.value;
    this.setState({ text });
  }

  handleSubmit(event) {
    event.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/form/submit');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        window.location.href = xhr.responseText;
      }
    };

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`text=${this.state.text}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.text} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
