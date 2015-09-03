import React from 'react';
import invokeOrDefault from '../client/invokeOrDefault';
import { restore } from './console';

function getData(layout) {
  const Layout = layout.type;
  const instance = new Layout(layout.props);
  const Container = Layout.container || 'div';
  const title = invokeOrDefault(instance.getTitle, '');
  const styles = invokeOrDefault(instance.getStyles, []);
  return { Container, title, styles };
}

export default React.createClass({
  propTypes: {
    layout: React.PropTypes.node.isRequired,
  },

  render() {
    const layout = this.props.layout;
    const { Container, title, styles } = getData(layout);
    const content = React.renderToString(layout);
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
        <body>
          <Container dangerouslySetInnerHTML={{__html: content}} />
        </body>
      </html>
    );
  },
});
