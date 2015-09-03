namespace Nancy.ViewEngines.React
{
    using System.IO;

    internal static class Extension
    {
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
