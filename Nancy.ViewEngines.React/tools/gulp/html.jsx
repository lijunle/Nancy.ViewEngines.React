import React from 'react';
import { restore } from './console';

function getTitle(layout) {
  const Layout = layout.type;
  const instance = new Layout(layout.props);
  const title = typeof instance.getTitle === 'function' ? instance.getTitle() : '';
  return title;
}

export default React.createClass({
  propTypes: {
    layout: React.PropTypes.node.isRequired
  },

  render() {
    const layout = this.props.layout;
    const title = getTitle(layout);
    const body = React.renderToString(layout);
    const consoleCode = restore();

    return (
      <html>
        <head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <script dangerouslySetInnerHTML={{__html: consoleCode}} />
        </head>
        <body dangerouslySetInnerHTML={{__html: body}} />
      </html>
    );
  }
});
