namespace Nancy.ViewEngines.React
{
    using System;
    using Nancy.Conventions;
    using Nancy.Responses;

    /// <inheritdoc/>
    public class ReactConventions : IConvention
    {
        /// <inheritdoc/>
        public void Initialise(NancyConventions conventions)
        {
            conventions.StaticContentsConventions.Add((context, rootPath) =>
            {
                string requestPath = context.Request.Path;
                if (requestPath.StartsWith(ReactConfiguration.PublicPath, StringComparison.InvariantCultureIgnoreCase))
                {
                    string relativePath = requestPath.Substring(ReactConfiguration.PublicPath.Length);
                    string filePath = Extension.ResolvePath(ReactConfiguration.ClientPath, relativePath);

                    // TODO only serve bundle source mapping in debug mode
                    return new GenericFileResponse(filePath);
                }
                else
                {
                    return null;
                }
            });
        }

        /// <inheritdoc/>
        public Tuple<bool, string> Validate(NancyConventions conventions) =>
            conventions.StaticContentsConventions == null
            ? Tuple.Create(false, "The static contents conventions cannot be null.")
            : Tuple.Create(true, string.Empty);
    }
}
