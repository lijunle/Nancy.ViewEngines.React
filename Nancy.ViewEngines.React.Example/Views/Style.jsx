import React from 'react';
import Layout from './StyleLayout';

export default React.createClass({
  propTypes: {
    styles: React.PropTypes.array.isRequired,
    updateStyles: React.PropTypes.func.isRequired,
  },

  statics: {
    layout: Layout,
  },

  getInitialState() {
    return {
      styles: this.props.styles,
      value: 'red',
    };
  },

  handleChange(event) {
    const value = event.target.value;
    this.setState({ value });
  },

  handleAdd() {
    const value = '';
    const styles = this.state.styles.concat([`/style/color/${this.state.value}`]);
    this.props.updateStyles(styles);
    this.setState({ styles, value });
  },

  handleRemove(style) {
    return () => {
      const styles = this.state.styles.filter(x => x !== style);
      this.props.updateStyles(styles);
      this.setState({ styles });
    };
  },

  renderItem(style) {
    const segments = style.split('/');
    const color = segments[segments.length - 1];

    return (
      <li className={color} key={color}>
        {style} <button onClick={this.handleRemove(style)}>remove</button>
      </li>
    );
  },

  render() {
    return (
      <div>
        <div>Colors:</div>
        <ul>{this.state.styles.map(this.renderItem)}</ul>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="button" value="Add" onClick={this.handleAdd} />
      </div>
    );
  },
});
