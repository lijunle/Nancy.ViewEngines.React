import React from 'react';
import ReactDOMServer from 'react-dom/server';
import invokeOrDefault from './invokeOrDefault';
import { restore } from './console';

function getData(layout) {
  const Layout = layout.type;
  const instance = new Layout(layout.props);
  const Container = Layout.container || 'div';
  const title = invokeOrDefault(instance.getTitle, '');
  const styles = invokeOrDefault(instance.getStyles, []);
  return { Container, title, styles };
}

function Viewpoint() {
  return React.createElement('meta', {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, user-scalable=no',
  });
}

function Console() {
  const consoleCode = restore();
  return consoleCode
    ? React.createElement('script', { dangerouslySetInnerHTML: { __html: consoleCode } })
    : null;
}

function Style({ style }) {
  return React.createElement('link', {
    rel: 'stylesheet',
    type: 'text/css',
    href: style,
    key: style,
  });
}

Style.propTypes = {
  style: React.PropTypes.string.isRequired,
};

export default function Html({ layout }) {
  const { Container, title, styles } = getData(layout);
  const content = ReactDOMServer.renderToString(layout);

  return React.createElement(
    'html',
    null,
    React.createElement(
      'head',
      null,
      React.createElement('title', null, title),
      React.createElement('meta', { charSet: 'utf-8' }),
      React.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
      React.createElement(Viewpoint),
      React.createElement(Console),
      (styles.map(style => React.createElement(Style, { style })))
    ),
    React.createElement(
      'body',
      null,
      React.createElement(
        Container,
        { dangerouslySetInnerHTML: { __html: content } }
      )
    )
  );
}

Html.propTypes = {
  layout: React.PropTypes.node.isRequired,
};
