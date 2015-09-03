namespace Nancy.ViewEngines.React
{
    using System.Collections.Generic;
    using System.IO;

    internal static class Extension
    {
        internal static KeyValuePair<string, string>? GetCsrfTokenSafe(
            this IRenderContext renderContext)
        {
            try
            {
                return renderContext.GetCsrfToken();
            }
            catch
            {
                return null;
            }
        }

        internal static string ResolvePath(params string[] paths) =>
            Path.GetFullPath(Path.Combine(paths));

        internal static string InjectModel(
            this string content,
            int viewId,
            object model,
            KeyValuePair<string, string>? csrfToken) =>
            !content.IsHtml() || !ReactConfiguration.Script.InjectionEnabled
            ? content
            : content
                .Replace("</head>", $"<script src='{ReactConfiguration.Script.Request}?t={ReactConfiguration.Script.HashCode}'></script></head>")
                .Replace("</body>", $"<script>render({viewId}, {ReactConfiguration.Serializer.Serialize(model)}, {RenderCsrf(content, csrfToken)})</script></body>");

        internal static string NormalizeDocType(this string content) =>
            !content.StartsWith("<html>")
            ? content
            : $"<!DOCTYPE html>\n{content}";

        private static bool IsHtml(this string content) =>
            content.EndsWith("</html>") &&
            content.Contains("</head>") &&
            content.Contains("</body>");

        private static string RenderCsrf(
            string html,
            KeyValuePair<string, string>? csrfToken) =>
            csrfToken != null && html.Contains(csrfToken.Value.Value)
            ? ReactConfiguration.Serializer.Serialize(csrfToken)
            : ReactConfiguration.Serializer.Serialize(null);
    }
}
