namespace Nancy.ViewEngines.React
{
    using System.Text;
    using Nancy;
    using Nancy.Bootstrapper;

    /// <inheritdoc/>
    public class ReactPipeline : IApplicationStartup
    {
        private readonly string rootPath;

        /// <summary>
        /// Initializes a new instance of the <see cref="ReactPipeline"/> class.
        /// </summary>
        /// <param name="rootPathProvider">The root path provider.</param>
        public ReactPipeline(IRootPathProvider rootPathProvider)
        {
            this.rootPath = rootPathProvider.GetRootPath();
        }

        /// <inheritdoc/>
        public void Initialize(IPipelines pipelines) =>
            pipelines.AfterRequest += async context =>
            {
                Response response = context.Response;
                string viewPath = context.GetReactViewPath();
                object model = context.NegotiationContext.DefaultModel;

                // check if it is a React response
                if (response != null && viewPath != null && model != null)
                {
                    // it is a need to pre-execute the response, otherwise throws NullReference
                    await response.PreExecute(context);

                    string injected = response.GetResponseContent()
                        .InjectModel(viewPath, model)
                        .InjectScript(this.rootPath)
                        .NormalizeDocType();

                    byte[] buffer = Encoding.UTF8.GetBytes(injected);

                    response.Contents = stream => stream.Write(buffer, 0, buffer.Length);
                }
            };
    }
}
