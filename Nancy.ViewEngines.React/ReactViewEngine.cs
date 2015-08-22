namespace Nancy.ViewEngines.React
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using JavaScriptEngineSwitcher.Core;
    using JSPool;
    using Nancy.ErrorHandling;
    using Nancy.Extensions;
    using Nancy.Responses;

    /// <summary>
    /// The React.js view engine.
    /// </summary>
    public class ReactViewEngine : IViewEngine, IDisposable
    {
        private readonly IEnumerable<IStatusCodeHandler> statusCodeHandlers;

        private readonly JsPool pool;

        /// <summary>
        /// Initializes a new instance of the <see cref="ReactViewEngine"/> class.
        /// </summary>
        /// <param name="statusCodeHandlers">The status code handlers. This is a workaround to generate error page, see NancyFx/Nancy#1948.</param>
        public ReactViewEngine(IEnumerable<IStatusCodeHandler> statusCodeHandlers)
        {
            this.statusCodeHandlers = statusCodeHandlers;

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
        public Response RenderView(ViewLocationResult viewLocationResult, dynamic model, IRenderContext renderContext)
        {
            var engine = this.pool.GetEngine();

            try
            {
                string path = GetViewLocationPath(viewLocationResult);
                string payload = ReactConfiguration.Serializer.Serialize(model);
                string html = engine.CallFunction<string>("render", path, payload);

                renderContext.Context.SetReactViewPath(path);

                return new HtmlResponse(contents: stream =>
                {
                    var writer = new StreamWriter(stream);
                    writer.Write(html);
                    writer.Flush();
                });
            }
            catch (JsRuntimeException e)
            {
                return RenderExceptionResponse(renderContext, this.statusCodeHandlers, e.ToString());
            }
            finally
            {
                this.pool.ReturnEngineToPool(engine);
            }
        }

        /// <summary>
        /// Dispose React.js view engine.
        /// </summary>
        /// <param name="disposing">Disposing.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this.pool != null)
                {
                    this.pool.Dispose();
                }
            }
        }

        private static string GetViewLocationPath(ViewLocationResult viewLocationResult) =>
            $"{viewLocationResult.Location}/{viewLocationResult.Name}.{viewLocationResult.Extension}";

        private static Response RenderExceptionResponse(
            IRenderContext renderContext,
            IEnumerable<IStatusCodeHandler> statusCodeHandlers,
            params string[] messages)
        {
            string separator = string.Concat(Environment.NewLine, Environment.NewLine);
            string message = string.Join(separator, messages);

            renderContext.Context.WriteTraceLog(
                x => x.AppendLine(string.Concat("[ReactViewEngine] Fail to render view, exception is thrown.", Environment.NewLine, message)));

            var statusCode = HttpStatusCode.InternalServerError;
            var context = new NancyContext();
            context.Items[NancyEngine.ERROR_KEY] = message;

            // TODO See NancyFx/Nancy#1948. Handle error status code manually by now.
            foreach (var statusCodeHandler in statusCodeHandlers)
            {
                if (statusCodeHandler.HandlesStatusCode(statusCode, context))
                {
                    statusCodeHandler.Handle(statusCode, context);
                }
            }

            return context.Response;
        }
    }
}
