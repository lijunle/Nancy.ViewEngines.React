# Nancy.ViewEngines.React

[![Build status](https://ci.appveyor.com/api/projects/status/ble4r54t6owl1mx2/branch/master?svg=true)](https://ci.appveyor.com/project/lijunle/nancy-viewengines-react/branch/master)

Use [React.js](https://facebook.github.io/react/) as view engine in Nancy.

# Features

- Use official [React.js](http://facebook.github.io/react/) package, with full functionalities.
- Enable ES6 features with [Babel](https://babeljs.io/).
- [Configurable](#configuration) via `Web.config` file or layout file.
- Integration support for [anti-forgery token](#anti-forgery-token).
- Enable source map in [debug build](#debug-build), but keep security in release build.

# Usage

- Install [Nancy.ViewEngines.React](https://www.nuget.org/packages/Nancy.ViewEngines.React) package from NuGet.
- Install one of the [JavaScriptEngineSwitcher engines](https://www.nuget.org/packages?q=JavaScriptEngineSwitcher), [V8](https://www.nuget.org/packages/JavaScriptEngineSwitcher.V8) is recommended.
-  [Configure](https://github.com/lijunle/Nancy.ViewEngines.React/blob/master/Nancy.ViewEngines.React.Example/Web.config#L44) your default JavaScriptEngineSwitcher engine.
- Follow Nancy [view location convention](https://github.com/NancyFx/Nancy/wiki/View-location-conventions) or [content negotiation](https://github.com/NancyFx/Nancy/wiki/Content-Negotiation) to place your `.jsx` files.
- Build and enjoy your Nancy application!

# How does it work?

- This package compile and bundle the JSX files into a JavaScript file via [Webpack](http://webpack.github.io/) when project is built.
- When Nancy launch, the JavaScript bundle file is loaded into [JSPool](http://dan.cx/projects/jspool).
- On each request, JSPool invoke the bundle file to generate React server-side render result and do some post-processes.
- The rendered result is returned to Nancy and delivered to user browser.

# Configuration

There are two parts of configurations. The settings for JavaScript compile and bundle locate at `Web.config` file. The settings for render runtime locate at React layout.

All settings are optional. Pre-defined settings work well in most cases. But you could overwrite them easily.

- In regards to compile and bundle settings, modify `Web.config` as the following block.

  Please reference [ReactConfiguration.xsd](https://github.com/lijunle/Nancy.ViewEngines.React/blob/master/Nancy.ViewEngines.React/ReactConfiguration.xsd) for available settings and their documentations, reference [ConfigurationFixtures](https://github.com/lijunle/Nancy.ViewEngines.React/tree/master/Nancy.ViewEngines.React.UnitTests/ConfigurationFixtures) folder for examples.

  ```
  <?xml version="1.0" encoding="utf-8"?>
  <configuration>
    <configSections>
      <section name="reactViewEngine" type="Nancy.ViewEngines.React.ReactConfiguration, Nancy.ViewEngines.React" />
    </configSections>
    <reactViewEngine xmlns="urn:Nancy.ViewEngines.React">
      <!-- put react view engine configurations -->
    </reactViewEngine>
  </configuration>
  ```

- In regards to render runtime settings, add a React component file in your project, then place its relative path to `Web.config` layout settings.

  The layout component accepts a rendering *view* and its *view model* as its props. They will be used to construct the page content, just as shown in [the default layout component](https://github.com/lijunle/Nancy.ViewEngines.React/blob/master/Nancy.ViewEngines.React/tools/client/layout.jsx).

  The layout can optionally expose `getTitle` and `getStyles` methods. The returned string from `getTitle` could be used as HTML title and will be update when changed. The returned string list from `getStyles` could in injected to HTML head to load CSS files. It will update on the fly when changed too. Please reference [TitleLayout.jsx ](https://github.com/lijunle/Nancy.ViewEngines.React/blob/master/Nancy.ViewEngines.React.Example/Views/TitleLayout.jsx) file and [StyleLayout.jsx](https://github.com/lijunle/Nancy.ViewEngines.React/blob/master/Nancy.ViewEngines.React.Example/Views/StyleLayout.jsx) file for examples.

  The layout can optionally define a static property `container` to let the layout wrap into that component. The HTML structure could be `body > container > layout`. The container component will be rendered as static HTML elements and *not* be re-bind on client-side. It is strongly *not* recommended to modify the default value.

- It is possible to use a specific layout component for one view component. Define a static property `layout` in the view component is OK. Please reference [Title.jsx](https://github.com/lijunle/Nancy.ViewEngines.React/blob/master/Nancy.ViewEngines.React.Example/Views/Title.jsx#L11) file for an example.

# Anti-forgery token

The react view engine natively provide anti-forgenry token to prevent cross-site request forgery attacks.

In your view component, import `nancy-csrf` as a React component. Then render this component in your fomr component.

Please reference [Csrf.jsx](https://github.com/lijunle/Nancy.ViewEngines.React/blob/master/Nancy.ViewEngines.React.Example/Views/Csrf.jsx) for an example.

# Debug build

The react view engine serves source maps in debug build for easier debugging. And it compresses the generated code and stop serving source maps in release build.

It determines the process is in debug build only when *all loaded* assemblies are *built* with debug flag. Otherwise, it considers the process is in release build.

# Example

Check the [Nancy.ViewEngines.React.Example](https://github.com/lijunle/Nancy.ViewEngines.React/tree/master/Nancy.ViewEngines.React.Example) project.

# License
MIT License.
