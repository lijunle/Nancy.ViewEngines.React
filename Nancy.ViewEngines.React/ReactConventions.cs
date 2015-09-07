namespace Nancy.ViewEngines.React
{
    using System;
    using System.IO;
    using Conventions;
    using Responses;
    using static ReactStatics;

    /// <inheritdoc/>
    public class ReactConventions : IConvention
    {
        /// <inheritdoc/>
        public void Initialise(NancyConventions conventions) =>
            conventions.StaticContentsConventions.Add(ClientPathConventions);

        /// <inheritdoc/>
        public Tuple<bool, string> Validate(NancyConventions conventions) =>
            conventions.StaticContentsConventions == null
            ? Tuple.Create(false, "The static contents conventions cannot be null.")
            : Tuple.Create(true, string.Empty);

        private static Response ClientPathConventions(NancyContext context, string rootPath)
        {
            string requestPath = context.Request.Path;
            if (requestPath.StartsWith(Server.AssetsPath, StringComparison.InvariantCultureIgnoreCase))
            {
                string relativePath = requestPath.Substring(Server.AssetsPath.Length);
                string filePath = Extension.ResolvePath(Script.Dir, relativePath);

                // only serve bundle source mapping in debug mode
                return !DebugMode && Path.GetExtension(filePath) == ".map"
                    ? null
                    : new GenericFileResponse(filePath);
            }
            else
            {
                return null;
            }
        }
    }
}
