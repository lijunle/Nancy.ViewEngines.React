namespace Nancy.ViewEngines.React
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using JSPool;
    using Responses;

    /// <summary>
    /// The React.js view engine.
    /// </summary>
    public class ReactViewEngine : IViewEngine, IDisposable
    {
        private static IDictionary<string, int> pathMapping;

        private readonly JsPool pool;

        static ReactViewEngine()
        {
            var path = Extension.ResolvePath(ReactConfiguration.ClientPath, "index.map");
            var content = File.ReadAllText(path);
            pathMapping = ReactConfiguration.Serializer.Deserialize<Dictionary<string, int>>(content);
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ReactViewEngine"/> class.
        /// </summary>
        public ReactViewEngine()
        {
            this.pool = new JsPool(new JsPoolConfig
            {
                // TODO uncomment the following line to enable unstable watch mode, see Daniel15/JSPool#9
                //// WatchPath = ReactConfiguration.ClientPath,
                WatchFiles = new string[] { ReactConfiguration.Script.Path },
                Initializer = initEngine => initEngine.ExecuteFile(ReactConfiguration.Script.Path)
            });
        }

        /// <summary>
        /// Gets the React.js view engine discovering extensions. Default is <c>jsx</c>.
        /// </summary>
        /// <value>The React.js view engine discovering extensions.</value>
        public IEnumerable<string> Extensions =>
            ReactConfiguration.Extensions;

        /// <inheritdoc/>
        public void Initialize(ViewEngineStartupContext viewEngineStartupContext)
        {
        }

        /// <inheritdoc/>
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <inheritdoc/>
        public Response RenderView(
            ViewLocationResult viewLocationResult,
            dynamic model,
            IRenderContext renderContext) =>
            new HtmlResponse(contents: stream =>
            {
                var engine = this.pool.GetEngine();
                var modelObject = model as object;
                var csrfToken = renderContext.GetCsrfTokenSafe();

                try
                {
                    var viewId = GetViewId(viewLocationResult);
                    var payload = ReactConfiguration.Serializer.Serialize(modelObject);

                    var html = engine.CallFunction<string>("render", viewId, payload)
                        .InjectModel(viewId, modelObject)
                        .NormalizeDocType();

                    var writer = new StreamWriter(stream);
                    writer.Write(html);
                    writer.Flush();
                }
                finally
                {
                    this.pool.ReturnEngineToPool(engine);
                }
            });

        /// <summary>
        /// Dispose React.js view engine.
        /// </summary>
        /// <param name="disposing">Disposing.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing && this.pool != null)
            {
                this.pool.Dispose();
            }
        }

        private static int GetViewId(ViewLocationResult viewLocationResult) =>
            pathMapping[$"{viewLocationResult.Location}/{viewLocationResult.Name}.{viewLocationResult.Extension}"];
    }
}
