var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');
var Html = require('./html');
var AntiForgeryToken = require('./client_modules/anti-forgery-token');
var invokeOrDefault = require('./invokeOrDefault');

function parse(payload) {
  try {
    return JSON.parse(payload);
  } catch (e) {
    return payload;
  }
}

function hook(layout, callback) {
  var LayoutPrototype = layout.type.prototype;
  var layoutRender = LayoutPrototype.render;
  LayoutPrototype.render = function renderLayout() {
    var result = layoutRender.apply(this, arguments);
    callback(this);
    return result;
  };
}

function addStyle(style, head) {
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', style);
  head.appendChild(link);
}

function removeStyle(style, head) {
  var query = 'link[href="' + style + '"]';
  head.querySelector(query).remove();
}

function updateStyles(styles, currentStyles, head) {
  currentStyles
    .filter(function _filterStyle(current) { return !styles.includes(current); })
    .forEach(function _removeStye(current) { removeStyle(current, head); });

  styles
    .filter(function _filterStyle(style) { return !currentStyles.includes(style); })
    .forEach(function _addStyle(style) { addStyle(style, head); });
}

function renderClientSide(layout) {
  var container = document.querySelector('[data-react-checksum]').parentElement;
  var instance = ReactDOM.render(layout, container);

  var head = document.getElementsByTagName('head')[0];
  var currentTitle = invokeOrDefault(instance.getTitle, '');
  var currentStyles = invokeOrDefault(instance.getStyles, []);

  // hooks to update static HTML elements when re-render layout
  hook(layout, function _hook() {
    if (typeof instance.getTitle === 'function') {
      var title = instance.getTitle() || '';
      if (currentTitle !== title) {
        window.document.title = title;
        currentTitle = title;
      }
    }

    if (typeof instance.getStyles === 'function') {
      var styles = instance.getStyles() || [];
      updateStyles(styles, currentStyles, head);
      currentStyles = styles;
    }
  });
}

function renderFactory(lookup, defaultLayout) {
  return function render(path, payload, token) {
    var view = lookup[path];
    var model = parse(payload);

    var Layout = view.layout || defaultLayout;
    var layout = React.createElement(Layout, { view: view, model: model });

    AntiForgeryToken.setToken(parse(token));

    return typeof window !== 'undefined'
      ? renderClientSide(layout) // client side
      : ReactDOMServer.renderToStaticMarkup( // server side
          React.createElement(Html, { layout: layout })
        );
  };
}

exports.default = renderFactory;
