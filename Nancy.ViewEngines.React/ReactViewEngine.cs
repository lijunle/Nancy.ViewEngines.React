namespace Nancy.ViewEngines.React
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using JSPool;
    using Responses;
    using static ReactStatics;

    /// <summary>
    /// The React.js view engine.
    /// </summary>
    public class ReactViewEngine : IViewEngine, IDisposable
    {
        private readonly JsPool pool;

        /// <summary>
        /// Initializes a new instance of the <see cref="ReactViewEngine"/> class.
        /// </summary>
        public ReactViewEngine()
        {
            this.pool = new JsPool(new JsPoolConfig
            {
                // TODO uncomment the following line to enable unstable watch mode, see Daniel15/JSPool#9
                //// WatchPath = ReactConfiguration.ClientPath,
                WatchFiles = new string[] { Script.Path },
                Initializer = initEngine => initEngine.ExecuteFile(Script.Path)
            });
        }

        /// <summary>
        /// Gets the React.js view engine discovering extensions. Default is <c>jsx</c>.
        /// </summary>
        /// <value>The React.js view engine discovering extensions.</value>
        public IEnumerable<string> Extensions =>
            Script.Extensions;

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
                var token = renderContext.GetTokenSafe();

                try
                {
                    var viewId = GetViewId(viewLocationResult);
                    var payload = Serializer.Serialize(modelObject);
                    var tokenJson = Serializer.Serialize(token);

                    var html = engine.CallFunction<string>("render", viewId, payload, tokenJson)
                        .InjectModel(viewId, modelObject, token)
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

        private static int GetViewId(ViewLocationResult view) =>
            Script.PathMapping[$"{view.Location}/{view.Name}.{view.Extension}"];
    }
}
