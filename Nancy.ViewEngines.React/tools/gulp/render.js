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

function renderClientSide(layout) {
  React.render(layout, window.document.body);

  // hooks to update static HTML elements when re-render layout
  hook(layout, (instance, result) => {
    if (typeof instance.getTitle === 'function') {
      const title = instance.getTitle() || '';
      window.document.title = title;
    }

    if (typeof instance.getStyles === 'function') {
      const styles = instance.getStyles() || [];
      window.console.log(styles); // TODO implement this
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
