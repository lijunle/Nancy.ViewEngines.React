import React from 'react';
import { restore } from './console';

function getData(layout) {
  const Layout = layout.type;
  const instance = new Layout(layout.props);
  const title = typeof instance.getTitle === 'function' ? instance.getTitle() : '';
  const styles = typeof instance.getStyles === 'function' ? instance.getStyles() : [];
  return { title, styles };
}

export default React.createClass({
  propTypes: {
    layout: React.PropTypes.node.isRequired
  },

  render() {
    const layout = this.props.layout;
    const { title, styles } = getData(layout);
    const body = React.renderToString(layout);
    const consoleCode = restore();

    return (
      <html>
        <head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          {consoleCode ? <script dangerouslySetInnerHTML={{__html: consoleCode}} /> : null}
          {styles.map(style => <link rel="stylesheet" type="text/css" href={style} />)}
        </head>
        <body dangerouslySetInnerHTML={{__html: body}} />
      </html>
    );
  }
});
