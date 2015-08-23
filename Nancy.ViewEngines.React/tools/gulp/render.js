import React from 'react';
import Html from './html';

function parse(payload) {
  try {
    return JSON.parse(payload);
  } catch (e) {
    return payload;
  }
}

function renderClientSide(layout) {
  React.render(layout, window.document.body);

  // TODO hooks on getStyles function too.
  // hooks to update document title when re-render layout
  const LayoutPrototype = layout.type.prototype;
  const layoutGetTitle = LayoutPrototype.getTitle;
  if (typeof layoutGetTitle === 'function') {
    const layoutRender = LayoutPrototype.render;
    LayoutPrototype.render = function renderWithTitle() {
      const result = layoutRender.apply(this, arguments);

      // update document title
      const title = layoutGetTitle.call(this) || '';
      window.document.title = title;

      return result;
    };
  }
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
