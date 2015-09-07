namespace Nancy.ViewEngines.React
{
    using System.Collections.Generic;
    using System.IO;
    using static ReactStatics;

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
            !content.IsHtml() || !Script.InjectionEnabled
            ? content
            : content
                .Replace("</head>", $"<script src='{Script.Request}?t={Script.HashCode}'></script></head>")
                .Replace("</body>", $"<script>render({viewId}, {model.AsJson()}, {RenderCsrf(content, csrfToken)})</script></body>");

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
            ? csrfToken.AsJson()
            : "null";

        private static string AsJson(this object @object) =>
            Serializer.Serialize(@object);
    }
}
