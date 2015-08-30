# Nancy.ViewEngines.React

[![Build status](https://ci.appveyor.com/api/projects/status/ble4r54t6owl1mx2/branch/master?svg=true)](https://ci.appveyor.com/project/lijunle/nancy-viewengines-react/branch/master)

Use [React.js](https://facebook.github.io/react/) as view engine in Nancy.

*This project is still in alpha stage.* The APIs may change in a future release. It is not recommended to use it in production.

# Features

- Use official React npm package, with full functionalities.
- Enable ES6 features with [Babel](https://babeljs.io/).

# Usage

- Install [Nancy.ViewEngines.React](https://www.nuget.org/packages/Nancy.ViewEngines.React) package from NuGet.
- Install one of the [JavaScriptEngineSwitcher engines](https://www.nuget.org/packages?q=JavaScriptEngineSwitcher), [V8](https://www.nuget.org/packages/JavaScriptEngineSwitcher.V8) is recommended.
-  [Configure](https://github.com/lijunle/Nancy.ViewEngines.React/blob/master/Nancy.ViewEngines.React.Example/Web.config#L44) your default JavaScriptEngineSwitcher engine.
- Follow Nancy [view location convention](https://github.com/NancyFx/Nancy/wiki/View-location-conventions) or [content negotiation](https://github.com/NancyFx/Nancy/wiki/Content-Negotiation) to place your `.jsx` files.
- Build and enjoy your Nancy application!

# How does it work?

- This package compile and bundle the JSX files into a JavaScript file via [Webpack](http://webpack.github.io/) when project is built.
- When Nancy launch, the JavaScript bundle file is loaded into [JSPool](http://dan.cx/projects/jspool).
- On each request, JSPool invoke the bundle exposed function to generate React server-side render result.
- Post-process some additional works on the render result. E.g., client side re-render logic injection.
- The final result is returned to Nancy and deliver to user browser.

# API
See [Nancy.ViewEngines.React.md](https://github.com/lijunle/Nancy.ViewEngines.React/blob/master/Nancy.ViewEngines.React/Nancy.ViewEngines.React.md) file.

# Example

Check the [Nancy.ViewEngines.React.Example](https://github.com/lijunle/Nancy.ViewEngines.React/tree/master/Nancy.ViewEngines.React.Example) project.

# License
MIT License.
