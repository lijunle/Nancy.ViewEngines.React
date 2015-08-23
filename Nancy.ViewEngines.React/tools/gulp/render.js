import React from 'react';
import Html from './html';

function parse(payload) {
  try {
    return JSON.parse(payload);
  } catch (e) {
    return payload;
  }
}

function hook(layout, callback) {
  const LayoutPrototype = layout.type.prototype;
  const layoutRender = LayoutPrototype.render;
  LayoutPrototype.render = function _render() {
    const result = layoutRender.apply(this, arguments);
    return callback(this, result);
  };
}

function newStyle(style) {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', style);
  return link;
}

function updateStyles(styles, currentStyles, head) {
  currentStyles
    .filter(current => styles.indexOf(current) === -1)
    .forEach(current => head.querySelector(`link[href='${current}']`).remove());

  styles
    .filter(style => currentStyles.indexOf(style) === -1)
    .forEach(style => head.appendChild(newStyle(style)));
}

function renderClientSide(layout) {
  const instance = React.render(layout, window.document.body);

  let head = document.getElementsByTagName('head')[0];
  let currentStyles = instance.getStyles();

  // hooks to update static HTML elements when re-render layout
  hook(layout, (instance, result) => {
    if (typeof instance.getTitle === 'function') {
      const title = instance.getTitle() || '';
      window.document.title = title;
    }

    if (typeof instance.getStyles === 'function') {
      const styles = instance.getStyles() || [];
      updateStyles(styles, currentStyles, head);
      currentStyles = styles;
    }

    return result;
  });
}

export default (lookup, defaultLayout) => {
  return function render(path, payload) {
    const view = lookup[path];
    const model = parse(payload);

    const Layout = view.layout || defaultLayout;
    const layout = <Layout view={view} model={model} />;

    return typeof window === 'undefined'
      ? React.renderToStaticMarkup(<Html layout={layout} />) // server side
      : renderClientSide(layout); // client side
  };
};
