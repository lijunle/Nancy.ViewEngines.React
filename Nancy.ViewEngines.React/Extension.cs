namespace Nancy.ViewEngines.React
{
    using System.IO;

    internal static class Extension
    {
        private const string ReactViewId = "Nancy.ViewEngines.React.ViewId";

        internal static void SetReactViewId(this NancyContext context, int viewId) =>
            context.Items[ReactViewId] = viewId;

        internal static int? GetReactViewId(this NancyContext context)
        {
            object viewId = null;
            return context.Items.TryGetValue(ReactViewId, out viewId)
                ? (int?)viewId
                : null;
        }

        internal static string GetResponseContent(this Response response)
        {
            using (var stream = new MemoryStream())
            {
                response.Contents.Invoke(stream);
                stream.Position = 0;

                var reader = new StreamReader(stream);
                string content = reader.ReadToEnd();

                return content;
            }
        }

        internal static string ResolvePath(params string[] paths) =>
            Path.GetFullPath(Path.Combine(paths));

        internal static string InjectModel(this string content, int viewId, object model) =>
            !content.IsHtml() || !ReactConfiguration.Script.InjectionEnabled
            ? content
            : content
                .Replace("</head>", $"<script src='{ReactConfiguration.Script.Request}?t={ReactConfiguration.Script.HashCode}'></script></head>")
                .Replace("</body>", $"<script>render({viewId}, {ReactConfiguration.Serializer.Serialize(model)})</script></body>");

        internal static string NormalizeDocType(this string content) =>
            !content.StartsWith("<html>")
            ? content
            : $"<!DOCTYPE html>\n{content}";

        private static bool IsHtml(this string content) =>
            content.EndsWith("</html>") &&
            content.Contains("</head>") &&
            content.Contains("</body>");
    }
}
