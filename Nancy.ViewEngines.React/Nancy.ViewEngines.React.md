<a name='contents'></a>
# Contents [#](#contents 'Go To Here')

- [ReactConventions](#T-Nancy.ViewEngines.React.ReactConventions 'Nancy.ViewEngines.React.ReactConventions')
  - [Initialise()](#M-Nancy.ViewEngines.React.ReactConventions.Initialise-Nancy.Conventions.NancyConventions- 'Nancy.ViewEngines.React.ReactConventions.Initialise(Nancy.Conventions.NancyConventions)')
  - [Validate()](#M-Nancy.ViewEngines.React.ReactConventions.Validate-Nancy.Conventions.NancyConventions- 'Nancy.ViewEngines.React.ReactConventions.Validate(Nancy.Conventions.NancyConventions)')
- [ReactPipeline](#T-Nancy.ViewEngines.React.ReactPipeline 'Nancy.ViewEngines.React.ReactPipeline')
  - [#ctor(rootPathProvider)](#M-Nancy.ViewEngines.React.ReactPipeline.#ctor-Nancy.IRootPathProvider- 'Nancy.ViewEngines.React.ReactPipeline.#ctor(Nancy.IRootPathProvider)')
  - [Initialize()](#M-Nancy.ViewEngines.React.ReactPipeline.Initialize-Nancy.Bootstrapper.IPipelines- 'Nancy.ViewEngines.React.ReactPipeline.Initialize(Nancy.Bootstrapper.IPipelines)')
- [ReactViewEngine](#T-Nancy.ViewEngines.React.ReactViewEngine 'Nancy.ViewEngines.React.ReactViewEngine')
  - [#ctor(statusCodeHandlers)](#M-Nancy.ViewEngines.React.ReactViewEngine.#ctor-System.Collections.Generic.IEnumerable{Nancy.ErrorHandling.IStatusCodeHandler}- 'Nancy.ViewEngines.React.ReactViewEngine.#ctor(System.Collections.Generic.IEnumerable{Nancy.ErrorHandling.IStatusCodeHandler})')
  - [Extensions](#P-Nancy.ViewEngines.React.ReactViewEngine.Extensions 'Nancy.ViewEngines.React.ReactViewEngine.Extensions')
  - [Dispose()](#M-Nancy.ViewEngines.React.ReactViewEngine.Dispose 'Nancy.ViewEngines.React.ReactViewEngine.Dispose')
  - [Dispose(disposing)](#M-Nancy.ViewEngines.React.ReactViewEngine.Dispose-System.Boolean- 'Nancy.ViewEngines.React.ReactViewEngine.Dispose(System.Boolean)')
  - [Initialize()](#M-Nancy.ViewEngines.React.ReactViewEngine.Initialize-Nancy.ViewEngines.ViewEngineStartupContext- 'Nancy.ViewEngines.React.ReactViewEngine.Initialize(Nancy.ViewEngines.ViewEngineStartupContext)')
  - [RenderView()](#M-Nancy.ViewEngines.React.ReactViewEngine.RenderView-Nancy.ViewEngines.ViewLocationResult,System.Object,Nancy.ViewEngines.IRenderContext- 'Nancy.ViewEngines.React.ReactViewEngine.RenderView(Nancy.ViewEngines.ViewLocationResult,System.Object,Nancy.ViewEngines.IRenderContext)')

<a name='assembly'></a>
# Nancy.ViewEngines.React [#](#assembly 'Go To Here') [^](#contents 'Back To Contents')

<a name='T-Nancy.ViewEngines.React.ReactConventions'></a>
## ReactConventions [#](#T-Nancy.ViewEngines.React.ReactConventions 'Go To Here') [^](#contents 'Back To Contents')

##### Namespace

Nancy.ViewEngines.React

##### Summary

*Inherit from parent.*

<a name='M-Nancy.ViewEngines.React.ReactConventions.Initialise-Nancy.Conventions.NancyConventions-'></a>
### Initialise() `method` [#](#M-Nancy.ViewEngines.React.ReactConventions.Initialise-Nancy.Conventions.NancyConventions- 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

*Inherit from parent.*

##### Parameters

This method has no parameters.

<a name='M-Nancy.ViewEngines.React.ReactConventions.Validate-Nancy.Conventions.NancyConventions-'></a>
### Validate() `method` [#](#M-Nancy.ViewEngines.React.ReactConventions.Validate-Nancy.Conventions.NancyConventions- 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

*Inherit from parent.*

##### Parameters

This method has no parameters.

<a name='T-Nancy.ViewEngines.React.ReactPipeline'></a>
## ReactPipeline [#](#T-Nancy.ViewEngines.React.ReactPipeline 'Go To Here') [^](#contents 'Back To Contents')

##### Namespace

Nancy.ViewEngines.React

##### Summary

*Inherit from parent.*

<a name='M-Nancy.ViewEngines.React.ReactPipeline.#ctor-Nancy.IRootPathProvider-'></a>
### #ctor(rootPathProvider) `constructor` [#](#M-Nancy.ViewEngines.React.ReactPipeline.#ctor-Nancy.IRootPathProvider- 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

Initializes a new instance of the [ReactPipeline](#T-Nancy.ViewEngines.React.ReactPipeline 'Nancy.ViewEngines.React.ReactPipeline') class.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| rootPathProvider | [Nancy.IRootPathProvider](#T-Nancy.IRootPathProvider 'Nancy.IRootPathProvider') | The root path provider. |

<a name='M-Nancy.ViewEngines.React.ReactPipeline.Initialize-Nancy.Bootstrapper.IPipelines-'></a>
### Initialize() `method` [#](#M-Nancy.ViewEngines.React.ReactPipeline.Initialize-Nancy.Bootstrapper.IPipelines- 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

*Inherit from parent.*

##### Parameters

This method has no parameters.

<a name='T-Nancy.ViewEngines.React.ReactViewEngine'></a>
## ReactViewEngine [#](#T-Nancy.ViewEngines.React.ReactViewEngine 'Go To Here') [^](#contents 'Back To Contents')

##### Namespace

Nancy.ViewEngines.React

##### Summary

The React.js view engine.

<a name='M-Nancy.ViewEngines.React.ReactViewEngine.#ctor-System.Collections.Generic.IEnumerable{Nancy.ErrorHandling.IStatusCodeHandler}-'></a>
### #ctor(statusCodeHandlers) `constructor` [#](#M-Nancy.ViewEngines.React.ReactViewEngine.#ctor-System.Collections.Generic.IEnumerable{Nancy.ErrorHandling.IStatusCodeHandler}- 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

Initializes a new instance of the [ReactViewEngine](#T-Nancy.ViewEngines.React.ReactViewEngine 'Nancy.ViewEngines.React.ReactViewEngine') class.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| statusCodeHandlers | [System.Collections.Generic.IEnumerable{Nancy.ErrorHandling.IStatusCodeHandler}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Collections.Generic.IEnumerable 'System.Collections.Generic.IEnumerable{Nancy.ErrorHandling.IStatusCodeHandler}') | The status code handlers. This is a workaround to generate error page, see NancyFx/Nancy#1948. |

<a name='P-Nancy.ViewEngines.React.ReactViewEngine.Extensions'></a>
### Extensions `property` [#](#P-Nancy.ViewEngines.React.ReactViewEngine.Extensions 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

Gets the React.js view engine discovering extensions. Default is `jsx`.

<a name='M-Nancy.ViewEngines.React.ReactViewEngine.Dispose'></a>
### Dispose() `method` [#](#M-Nancy.ViewEngines.React.ReactViewEngine.Dispose 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

*Inherit from parent.*

##### Parameters

This method has no parameters.

<a name='M-Nancy.ViewEngines.React.ReactViewEngine.Dispose-System.Boolean-'></a>
### Dispose(disposing) `method` [#](#M-Nancy.ViewEngines.React.ReactViewEngine.Dispose-System.Boolean- 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

Dispose React.js view engine.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| disposing | [System.Boolean](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Boolean 'System.Boolean') | Disposing. |

<a name='M-Nancy.ViewEngines.React.ReactViewEngine.Initialize-Nancy.ViewEngines.ViewEngineStartupContext-'></a>
### Initialize() `method` [#](#M-Nancy.ViewEngines.React.ReactViewEngine.Initialize-Nancy.ViewEngines.ViewEngineStartupContext- 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

*Inherit from parent.*

##### Parameters

This method has no parameters.

<a name='M-Nancy.ViewEngines.React.ReactViewEngine.RenderView-Nancy.ViewEngines.ViewLocationResult,System.Object,Nancy.ViewEngines.IRenderContext-'></a>
### RenderView() `method` [#](#M-Nancy.ViewEngines.React.ReactViewEngine.RenderView-Nancy.ViewEngines.ViewLocationResult,System.Object,Nancy.ViewEngines.IRenderContext- 'Go To Here') [^](#contents 'Back To Contents')

##### Summary

*Inherit from parent.*

##### Parameters

This method has no parameters.
