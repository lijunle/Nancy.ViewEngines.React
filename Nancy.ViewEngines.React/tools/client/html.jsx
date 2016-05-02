var React = require('react');
var ReactDOMServer = require('react-dom/server');
var invokeOrDefault = require('./invokeOrDefault');
var restore = require('./console').restore;

function getData(layout) {
  var Layout = layout.type;
  var instance = new Layout(layout.props);
  var Container = Layout.container || 'div';
  var title = invokeOrDefault(instance.getTitle, '');
  var styles = invokeOrDefault(instance.getStyles, []);
  return {
    Container: Container,
    title: title,
    styles: styles,
  };
}

function Viewpoint() {
  return React.createElement('meta', {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, user-scalable=no',
  });
}

function Console() {
  var consoleCode = restore();
  return consoleCode
    ? React.createElement('script', { dangerouslySetInnerHTML: { __html: consoleCode } })
    : null;
}

function Style(props) {
  return React.createElement('link', {
    rel: 'stylesheet',
    type: 'text/css',
    href: props.style,
    key: props.style,
  });
}

Style.propTypes = {
  style: React.PropTypes.string.isRequired,
};

function Html(props) {
  var data = getData(props.layout);
  var Container = data.Container;
  var title = data.title;

  var styleElements = data.styles.map(function styleElement(style) {
    return React.createElement(Style, { style: style });
  });

  var content = ReactDOMServer.renderToString(props.layout);

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
      styleElements
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

module.exports = Html;
